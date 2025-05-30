---
layout: gptcourse
---

## Как работают нейросети

Генеративные нейросети могут разговаривать с нами и отвечать на наши вопросы так, как будто бы они прекрасно понимают смысл текста. Как они это делают?

Спросим у YandexGPT:

{% include dialog id="dialogone" text="Показать" %}
<script type="application/dialog" id="dialogone">
{
    "messages": [
        {
            "sender": "user",
            "content": "Скажи, понимаешь ли ты смысл того, что пишешь?"
        },
        {
            "sender": "ai",
            "content": "Как модель искусственного интеллекта, я не обладаю сознанием, поэтому не могу «понимать» в человеческом смысле этого слова. Однако я умею обрабатывать и анализировать большие объёмы данных, выявлять закономерности и на их основе генерировать ответы на вопросы и запросы пользователей."
        }
    ]
}
</script>

Нейросеть обрабатывает текст по кусочкам, которые называются токенами. Иногда они совпадают со словами, но чаще токены короче. Например, слово “киноман” может быть разбито на 2 части: кино и ман. Но для простоты будем считать, что нейросеть работает со словами.
Когда нейросети на вход подаётся какой-то текст, она по каждому токену формирует его “вектор смысла”, называемый эмбеддингом. 

![](../img/1-1-embeddings.png)

{% include qa q="Что такое вектор" a=" 
Вектор - это набор чисел. Можно считать, что вектор задаёт точку в каком-то пространстве. Вектор из двух чисел - в двухмерном, из трех - в трехмерном. Пространство смыслов - многомерное, так вектора обычно имеют длину 512 или 1024." %}

Эмбеддинги обладают таким свойством, что похожим по смыслу словам соответствуют близкие вектора. Таким образом, смысл слова определяется его местоположением в пространстве смыслов.

![](../img/1-2-embeddingspace.png)

На основе индивидуальных “смыслов” отдельных слов нейросеть строит комбинированный смысл всего запроса - также в виде вектора смысла. Такой этап “осмысления” текста достаточно сложен, и основан на механизме внимания - слова как бы смотрят друг на друга и обмениваются смыслами, при этом становится понятным, какие слова более важны для понимания смысла всего текста, а какие - менее. Также как и человек, нейросеть обращает больше внимания на важные слова.

![](../img/1-3-textembedding.png)

Дальше на основе смысла всего предложения нейросеть предсказывает следующее слово. Точнее, оно предсказывает сразу несколько наиболее вероятных слов, которые могут стоять дальше в тексте.

![](../img/1-4-pred1.png)

Исходя из полученных вероятностей, мы можем выбрать слово, которым прололжить текст. Это может быть как самое вероятное слово, так и случайно выбранное слово среди наиболее вероятных. 

Предположим, что в нашем примере мы выбрали слово “вечером”. Тогда мы снова просим нейросеть посмотреть на весь входной текст, с добавленным к нему словом “вечером”, и предсказать вероятности следующего слова.

![](../img/1-5-pred2.png)

Таким образом, дописывая слово за словом, генеративная нейросеть генерирует весь ответ на наш первоначальный запрос.

<section class="qa-section">
<h3>Вопрос-ответ</h3>
{% include qa
  q="Почему ответы нейросети на один и тот же вопрос каждый раз различаются?"
  a="Потому что при выборе следующего слова она случайным образом выбирает одно из наиболее вероятных слов. Такой случайный выбор делает ответы сети более разнообразными."
%}
</section>

Вернемся в исходному вопросу: понимает ли нейросеть смысл слов? Понимание смысла для нейросети - это способность отобразить текст в вектор смысла, совершить какие-то осмысленные операции с этим вектором, и отобразить результат снова в текст. Таким образом нейросеть может синтезировать новые смыслы и искать ответы на неочевидные вопросы. 

{% include dialog id="dialogtwo" text="Показать" %}
<script type="application/dialog" id="dialogtwo">
{
    "messages": [
        {
            "sender": "user",
            "content": "Какое промежуточное по смыслу слово между словами кошка и книга?"
        },
        {
            "sender": "ai",
            "content": "Поиск промежуточного слова на основе смысла может быть субъективным и неоднозначным, поскольку зависит от контекста и ассоциаций. В данном случае можно предположить, что промежуточным словом может быть «полка», так как кошки могут лежать на полках, а книги часто стоят на них. Однако это всего лишь один из возможных вариантов."
        }
    ]
}
</script>
