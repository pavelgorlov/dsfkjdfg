var recipe = {
  "serv": "для 2х порций", // на сколько человек
  "time": "1 час 10 мин", // время приготовления

  // шаги приготовления
  "steps": [
    {
      "title": "Подготовка",
      "duration": "10 мин.",
      "hints": [
        {
          "name": "<div class='recipe-hint-num'>1.</div><div class='zfix'>&mdash;&nbsp;Рябину лучше заранее заморозить, а&nbsp;потом разморозить&nbsp;&mdash; в&nbsp;этом случае она становится менее терпкой и&nbsp;теряет горечь. Цуккини нарезать кружочками или кубиками.</div>",
          "image": "../images/recipe/1_1.jpg",
        }
      ]
    },
    {
      "title": "Обжарка",
      "duration": "35 мин.",
      "hints": [
        {
          "name": "<div class='recipe-hint-num'>2.</div><div class='zfix'>Каре ягненка сбрызнуть оливковым маслом и&nbsp;обжарить на&nbsp;гриле со&nbsp;всех сторон до&nbsp;полуготовности. Посолить, поперчить.</div>",
          "image": "../images/recipe/1_2.jpg",
        }
      ]
    },
    {
      "title": "Тушение",
      "image": "",
      "duration": "10 мин.",
      "hints": [
        {
          "name": "<div class='recipe-hint-num'>3.</div><div class='zfix'>Одновременно приготовить овощи. Нагреть оливковое масло (я&nbsp;использую масло extra virgin) в&nbsp;сотейнике, добавить рябину и&nbsp;цуккини и&nbsp;потушить в&nbsp;течение 10&nbsp;минут. Посолить в&nbsp;конце.</div>",
          "image": "../images/recipe/1_3.jpg",
        }
      ]
    },
    {
      "title": "Запекание",
      "image": "",
      "duration": "15 мин.",
      "hints": [
        {
          "name": "<div class='recipe-hint-num'>4.</div><div class='zfix'>Обжаренное мясо запекать в&nbsp;духовке в&nbsp;течение 15&nbsp;минут при температуре 200&nbsp;градусов. А&nbsp;после дать немного постоять, чтобы мясо пропиталось соком. Я&nbsp;рекомендую степень прожарки&nbsp;&mdash; medium well done.</div>",
          "image": "../images/recipe/1_4.jpg",
        },
        {
          "name": "<div class='recipe-hint-num'>5.</div><div class='zfix'>Самое сложное в рецепте – это соус демиглас, если готовить его дома. Демиглас – это классический французский соус, который отлично подходит для мясных блюд. Рецепт соуса таков: запекаем кости с кусками мяса (все виды костей, кроме свиных) в духовке в течение двух часов, а после кладем их...</div>",
          "image": "../images/recipe/1_5.jpg",
        },
        {
          "name": "<div class='recipe-hint-num'>6.</div><div class='zfix'>Это красивое блюдо, поэтому важно правильно его подать.  Соус будет подложкой для мяса. Поверх соуса положить уже готовое мясо, а&nbsp;рядом выложить овощи. Лучше всего блюдо украшать тем, что можно есть, поэтому я&nbsp;для красоты добавляю листья салата, базилик, ростки молодого горошка.</div>",
          "image": "../images/recipe/1_6.jpg",
        },
        {
          "name": "<div class='zfix'>Это легкое, диетическое блюдо, оно отлично подойдет и&nbsp;для полета в&nbsp;самолете, и&nbsp;для семейного ужина. К&nbsp;нему подойдет горячий зеленый чай или сухое красное вино.</div>",
          "image": "../images/recipe/1_7.jpg",
        }
      ]
    }
  ],

  // продукты
  "ingredients": [
    {
      "name": "Рябина",
      "icon": "../images/tmp/12.png",
      "qty": "50 г",
      "step": 0,    // на каком шаге..
      "substep": 0  // ..и подшаге рецепта используется продукт
    },
    {
      "name": "Цуккини",
      "icon": "../images/tmp/40.png",
      "qty": "100 г",
      "step": 0,
      "substep": 0
    },
    {
      "name": "Каре ягненка",
      "icon": "../images/tmp/13.png",
      "qty": "1 кг",
      "step": 1,
      "substep": 0
    },
    {
      "name": "Масло оливковое",
      "icon": "../images/tmp/14.png",
      "qty": "70 мл",
      "step": 1,
      "substep": 0
    },
    {
      "name": "Соль",
      "icon": "../images/tmp/15.png",
      "qty": "5 г",
      "step": 1,
      "substep": 0
    },
    {
      "name": "Перец",
      "icon": "../images/tmp/16.png",
      "qty": "5 г",
      "step": 1,
      "substep": 0
    },
    {
      "name": "Соус демиглас",
      "icon": "../images/tmp/17.png",
      "qty": "50 мл",
      "step": 3,
      "substep": 1
    },
    {
      "name": "Листья салата",
      "icon": "../images/tmp/19.png",
      "qty": "30 г",
      "step": 3,
      "substep": 2
    },
    {
      "name": "Базилик",
      "icon": "../images/tmp/19.png",
      "qty": "15 г",
      "step": 3,
      "substep": 2
    },
    {
      "name": "Ростки молодого горошка",
      "icon": "../images/tmp/20.png",
      "qty": "10 г",
      "step": 3,
      "substep": 2
    }
  ]
};
