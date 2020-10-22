import * as mdb from 'mdb-ui-kit';
import $ from "jquery";

import { MDCList } from '@material/list';
import { MDCSelect } from '@material/select';

console.log(document.querySelector('.mdc-list'));
// const list = new MDCList(document.querySelector('.mdc-list'));
var listEle = document.getElementById('my-list');
var list = new mdc.list.MDCList(listEle);
list.singleSelection = true;

const select = new MDCSelect(document.querySelector('.mdc-select'));

select.listen('MDCSelect:change', () => {
  alert(`Selected option at index ${select.selectedIndex} with value "${select.value}"`);
});

let globalNumberOfItems = 5;
let globalWeight = 500;

let currenlyBeingEdited = '';

// // Double click to delete hint about removing
$('.hints .hint').on('dblclick', (event) => {
  event.currentTarget.style.opacity = '0';
  setTimeout(() => {
    event.currentTarget.remove();
  }, 200);
});

// Hide ul if there is no content in it
const vegetables = $('#vegetables');
const fruits = $('#fruits');
const dairy = $('#dairy');
const baked = $('#baked');
const drinks = $('#drinks');
const hygiene = $('#hygiene');
const others = $('#others');
const ulDivs = [vegetables, fruits, dairy, baked, drinks, hygiene, others];

// Remove li or ul ( on innit )
$('ul li').on('dblclick', (event) => {
  removeOnDblclick(event);
});

// Make lists sortable by dragging
$(() => {
  ulDivs.forEach((ul) => {
    ul.sortable();
  });
});

$('#dodaj').click(pushItem);

$('#aktualizuj').click(() => {
  pushItem();
  setTimeout(250, removeCurrentlyEdited());
  clearForm();
});

// Allow editing (on innit)
let timeoutId = 0;
const productNames = $('ul:not(#choosedCategory) li .mdc-list-item__text');
productNames.each((index) => {
  const presentItem = $(productNames[index]);
  allowEdit(presentItem);
});

// ----------------------- F U N C T I O N S -----------------------
export function edit(li) {
  const liProductName = $(li)[0].textContent;
  const liCategory = $(li).parent().parent()[0].id;
  const liAmount = $(li)[0].nextElementSibling.textContent;
  const liNumber = liAmount.split(' ')[0];
  const liUnit = liAmount.split(' ')[1];

  setCurrentlyEdited($(li).parent());

  $('#form2').val(liProductName);
  $('#form2')[0].nextElementSibling.className = 'active';
  if (liUnit === 'szt') {
    $('#form3').val(liNumber);
    $('#form3')[0].nextElementSibling.className = 'active';
  } else if (liUnit === 'dag') {
    $('#form31').val(liNumber);
    $('#form31')[0].nextElementSibling.className = 'active';
    // eslint-disable-next-line no-console
  } else console.log('Error while performing edit function (unit)');
  select.value = liCategory;

  $('#dodaj')[0].style.display = 'none';
  $('#aktualizuj')[0].style.display = 'inline-block';
}

export function pushItem() {
  const numberOfItems = $('#form3').val();
  const weight = $('#form31').val();
  const newItem = $('#form2').val();

  if (
    (numberOfItems === '' && weight !== '' && newItem !== '') ||
    (numberOfItems !== '' && weight === '' && newItem !== '')
  ) {
    // Grabbing amount from input
    const amount = $('#form3').val() === '' ? `${weight} dag` : `${numberOfItems} szt`;
    const category = select.value;

    // Create a new li and add to matched ul
    $(`ul#${category}`).append(
      `<li class="mdc-list-item">
      <span class="mdc-list-item__ripple"></span>
      <span class="mdc-list-item__text">${newItem}</span>
      <span aria-hidden="true" class="mdc-list-item__meta">${amount}</span>
    </li>`
    );

    // Event to remove li or ul for new item
    $(`ul#${category} li:last-child`).on('dblclick', (event) => {
      const numberOfItems =
        event.currentTarget.lastElementChild.innerText.split(' ')[1] === 'szt'
          ? event.currentTarget.lastElementChild.innerText.split(' ')[0]
          : 0;
      const weight =
        event.currentTarget.lastElementChild.innerText.split(' ')[1] === 'dag'
          ? event.currentTarget.lastElementChild.innerText.split(' ')[0]
          : 0;

      // eslint-disable-next-line no-restricted-syntax
      for (const ul of ulDivs) {
        if (
          event.currentTarget === ul[0].children[1] &&
          event.currentTarget === ul[0].children[ul[0].children.length - 1]
        ) {
          ul[0].style.opacity = '0';
          setTimeout(() => {
            ul[0].style.display = 'none';
          }, 200);
        } else {
          event.currentTarget.style.opacity = '0';
          setTimeout(() => {
            event.currentTarget.remove();
          }, 200);
        }
      }

      setTimeout(() => {
        // Counter update
        globalNumberOfItemsCounter('minus', numberOfItems);
        globalWeightCounter('minus', weight);
        countItems();
      }, 300);
    });

    // Event to allow edit that new element
    allowEdit($(`ul#${category} li:last-child`));

    // Show hidden category
    if ($(`ul#${category}`)[0].style.display === 'none') {
      $(`ul#${category}`)[0].style.opacity = '1';
      $(`ul#${category}`)[0].style.display = 'block';
    }

    // data-dismiss="modal"
    $('.modal').modal('hide');
    $('body').removeClass('modal-open');
    $('body').css('padding-right', '0px');
    $('.modal-backdrop').remove();

    // Counter update
    globalNumberOfItemsCounter('plus', numberOfItems);
    globalWeightCounter('plus', weight);
    countItems();
  } else {
    // eslint-disable-next-line no-alert
    alert('Uzupelnij (tylko) wymagane pola.');
  }
}

export function removeOnDblclick(event) {
  const numberOfItems =
    event.currentTarget.lastElementChild.innerText.split(' ')[1] === 'szt'
      ? event.currentTarget.lastElementChild.innerText.split(' ')[0]
      : 0;
  const weight =
    event.currentTarget.lastElementChild.innerText.split(' ')[1] === 'dag'
      ? event.currentTarget.lastElementChild.innerText.split(' ')[0]
      : 0;

  // eslint-disable-next-line no-restricted-syntax
  for (const ul of ulDivs) {
    if (
      event.currentTarget === ul[0].children[1] &&
      event.currentTarget === ul[0].children[ul[0].children.length - 1]
    ) {
      ul[0].style.opacity = '0';
      setTimeout(() => {
        ul[0].style.display = 'none';
      }, 200);
    } else {
      event.currentTarget.style.opacity = '0';
      setTimeout(() => {
        event.currentTarget.remove();
      }, 200);
    }
  }

  setTimeout(() => {
    // Counters update
    globalNumberOfItemsCounter('minus', numberOfItems);
    globalWeightCounter('minus', weight);
    countItems();
  }, 200);
}

export function setCurrentlyEdited(element) {
  currenlyBeingEdited = element;
}

export function removeCurrentlyEdited() {
  const numberOfItems =
    currenlyBeingEdited[0].lastElementChild.innerText.split(' ')[1] === 'szt'
      ? currenlyBeingEdited[0].lastElementChild.innerText.split(' ')[0]
      : 0;
  const weight =
    currenlyBeingEdited[0].lastElementChild.innerText.split(' ')[1] === 'dag'
      ? currenlyBeingEdited[0].lastElementChild.innerText.split(' ')[0]
      : 0;

  // eslint-disable-next-line no-restricted-syntax
  for (const ul of ulDivs) {
    if (
      currenlyBeingEdited[0] === ul[0].children[1] &&
      currenlyBeingEdited[0] === ul[0].children[ul[0].children.length - 1]
    ) {
      ul[0].style.opacity = '0';
      setTimeout(() => {
        ul[0].style.display = 'none';
      }, 200);
    } else {
      currenlyBeingEdited[0].style.opacity = '0';
      // eslint-disable-next-line no-loop-func
      setTimeout(() => {
        currenlyBeingEdited[0].remove();
      }, 200);
    }
  }

  setTimeout(() => {
    // Counters update
    globalNumberOfItemsCounter('minus', numberOfItems);
    globalWeightCounter('minus', weight);
    countItems();
  }, 200);

  currenlyBeingEdited.remove();
}

export function clearForm() {
  $('#form2').val('');
  $('#form2')[0].nextElementSibling.className = '';
  $('#form3').val('');
  $('#form3')[0].nextElementSibling.className = '';
  $('#form31').val('');
  $('#form31')[0].nextElementSibling.className = '';
  select.value = '';
}

export function countItems() {
  const numberOfLis = $('ul li');
  const numberOfMenuLis = $('ul#choosedCategory li');
  $('#produkty').html(numberOfLis.length - numberOfMenuLis.length);
}

export function globalNumberOfItemsCounter(sign, number) {
  if (sign === 'plus') globalNumberOfItems += Number(number);
  if (sign === 'minus') globalNumberOfItems -= Number(number);
  $('#sztuki').html(globalNumberOfItems);
}

export function globalWeightCounter(sign, number) {
  if (sign === 'plus') globalWeight += Number(number);
  if (sign === 'minus') globalWeight -= Number(number);
  $('#waga').html(globalWeight);
}

export function allowEdit(product) {
  product
    .on('mousedown', function () {
      timeoutId = setTimeout(() => {
        $('.modal').modal('show');
        edit($(this));
      }, 1000);
    })
    .on('mouseup mouseleave', () => {
      clearTimeout(timeoutId);
    });
}

export default {
  mdb,
  list,
  select,
};
