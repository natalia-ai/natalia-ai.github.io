'use strict';
(function () {
  var ELEMENT_N = 3;
  var cardTemplate = $('#template-card').children('.card-box'),
    cardsContainer = $('.page__cards-box'),
    renderedCards = [];

  var cardIds = ['templateId-1', 'templateId-2', 'templateId-3'];
  var cardBoxDescriptions = ['Печень утки разварная с артишоками', 'Головы щучьи с чесноком да свежайшая сёмгушка', 'Филе из цыплят с трюфелями в бульоне'];
  var productAdditives = ['с фуа-гра', 'с рыбой', 'с курой'];
  var numberOfPortions = ['10', '40', '100'];
  var numbersForDeclensionOfPortions = ['10', '40', '100'];
  var numberOfBonuses = ['', '2', '5'];
  var numbersForDeclensionOfBonuses = ['1', '2', '5'];
  var productWeights = ['0,5', '2', '5'];
  var inputAttributes = ['foiegras', 'fish', 'chicken'];
  var renderStatuses = ['default', 'selected', 'disabled']

  function makeObject() {
    var objectArray = Array(ELEMENT_N);
    for (var i = 0; i < ELEMENT_N; i++) {
      var objectTemplate = {};

      objectTemplate.cardId = cardIds[i];
      objectTemplate.cardBoxDescription = cardBoxDescriptions[i] + '.';
      objectTemplate.additive = productAdditives[i];
      objectTemplate.portion = numberOfPortions[i];
      objectTemplate.bonus = numberOfBonuses[i];
      objectTemplate.numberForDeclensionOfPortions = numbersForDeclensionOfPortions[i];
      objectTemplate.numberForDeclensionOfBonuses = numbersForDeclensionOfBonuses[i];
      objectTemplate.weight = productWeights[i];
      objectTemplate.inputAttribute = inputAttributes[i];
      objectTemplate.renderStatus = renderStatuses[i];
      objectArray[i] = objectTemplate;
    }
    return objectArray;
  };

  function createCard(product) {
    var card = cardTemplate.clone().appendTo($('.form'));
    var input = $('input');
    cardTemplate.remove();
    $('.card-wrapper').attr("id", product.cardId);
    $('.card__subtitle').text(product.additive);
    $('.card__text--portion').prepend('<b>' + product.portion + '</b>' + declineNouns(product.numberForDeclensionOfPortions, [' порция', ' порции', ' порций']));
    var bonus = $('.card__text--bonus');
    bonus.text(declineNouns(product.numberForDeclensionOfBonuses, [' мышь', ' мыши', ' мышей']) + ' в подарок');
    bonus.prepend('<b>' + product.bonus + '</b>');

    if (product.portion === numberOfPortions[2]) {
      $('.card__texts').append('<p class="card__text">заказчик доволен</p>');
    }

    $('.card__weight').prepend(product.weight);
    input.prop('name', product.inputAttribute);
    input.prop('value', product.inputAttribute);
    $('.card').attr('data-disabled', 'Печалька,' + product.additive + ' закончился.');
    $('.card-box__description').attr('data-selected', product.cardBoxDescription);
    return card;
  };

  function declineNouns(n, nouns) {
    return nouns[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
  };

  function renderCards(data) {
    var fragment = $(document.createDocumentFragment());
    $(data).each(function (item) {
      var card = createCard(data[item]);
      renderedCards.push(card);
      $(fragment.append(card));
    });
    cardsContainer.append(fragment);

    $(data).each(function (item) {
      switch (data[item].renderStatus) {
        case 'default':
          defaultCard('input:checkbox[name="' + data[item].inputAttribute + '"]', '#' + data[item].cardId);
          break;
        case 'selected':
          selectCard('input:checkbox[name="' + data[item].inputAttribute + '"]', '#' + data[item].cardId);
          break;
        case 'disabled':
          disableCard('input:checkbox[name="' + data[item].inputAttribute + '"]', '#' + data[item].cardId);
          break;
        default:
          alert('Bullshit in data!');
          break;
      }
    });
  };

  function getHappyPet(cardId) {
    return $(cardId).next('.card-box__make-your-pet-happy');
  }

  function bueProduct(cardId) {
    return $(cardId).find('.card-checkbox__to-bue');
  }

  function disableCard(inputName, cardId) {
    var cardBoxMakeYourPetHappy = getHappyPet(cardId);
    var productBue = bueProduct(cardId);
    if ($(inputName).prop('disabled', true)) {
      $(cardId).addClass('is-disabled');
      cardBoxMakeYourPetHappy.next('.card-box__description').css('visibility', 'hidden');
      cardBoxMakeYourPetHappy.css('visibility', 'hidden');
      productBue.css('visibility', 'hidden');
    }
  };

  function selectCard(inputName, cardId) {
    var cardBoxMakeYourPetHappy = getHappyPet(cardId);
    var productBue = bueProduct(cardId);
    if ($(inputName).prop('selected', true)) {
      $(cardId).addClass('is-selected');
      cardBoxMakeYourPetHappy.next('.card-box__description').css('visibility', 'visible');
      cardBoxMakeYourPetHappy.css('visibility', 'hidden');
      productBue.css('visibility', 'hidden');
      $(cardId).find('input').prop('checked', true);
    }
  };

  function defaultCard(inputName, cardId) {
    var cardBoxMakeYourPetHappy = getHappyPet(cardId);
    var productBue = bueProduct(cardId);
    if ($(inputName).prop('selected', false)) {
      cardBoxMakeYourPetHappy.next('.card-box__description').css('visibility', 'hidden');
      cardBoxMakeYourPetHappy.css('visibility', 'visible');
      productBue.css('visibility', 'visible');
    }
  };

  $(cardsContainer).on('click', 'div[id^="templateId-"]', statusClickHandler);

  function statusClickHandler(event) {
    var checkbox = $(this).find('input'),
      makeYourPetHappy = $(this).next('.card-box__make-your-pet-happy'),
      description = makeYourPetHappy.next('.card-box__description');

    event.preventDefault();
    if ($(this).hasClass('is-selected')) {
      $(this).removeClass('is-selected');
      $(this).removeClass('is-selected-hover');
      $(description).css('visibility', 'hidden');
      $(makeYourPetHappy).css('visibility', 'visible');
      $(this).find('.card-checkbox__to-bue').css('visibility', 'visible');
      $(checkbox).prop('checked', false);
    } else {
      $(this).addClass('is-selected');
      $(description).css('visibility', 'visible');
      $(makeYourPetHappy).css('visibility', 'hidden');
      $(this).find('.card-checkbox__to-bue').css('visibility', 'hidden');
      $(checkbox).prop('checked', true);
    }
  };

  $(cardsContainer).on('mouseleave', 'div[id^="templateId-"]', statusMouseleaveHandler);

  function statusMouseleaveHandler(event) {
    event.preventDefault();
    if ($(this).hasClass('is-selected')) {
      $(this).addClass('is-selected-hover');
    }
  }

  document.addEventListener('DOMContentLoaded', function (event) {
    event.preventDefault();
    renderCards(makeObject());
  });
})();