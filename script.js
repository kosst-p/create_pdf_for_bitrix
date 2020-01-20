$(document).ready(function() {
    //создадим функцию,которая будет сохранять таблицу в виде картинки и далее будет создаваться pdf файл
    const printPDF = async () => {
        $(".donwloadOk").css("display", "none");

        let element = $("#elementToPrint"), // получим необходимый элемент со страницы, который дальше будет отрисовываться в pdf
            clone = element
                .clone(true) // клонируем его
                .addClass("cloneClass") // присвоим ему класс по которому обратимся к нему
                .addClass("fontSizePDF"); // присвоим ему класс, со набором стилей для корректного отображения в pdf документе

        /* стили не применяются к клонированному элементу, так как он еще не отрисован в DOM, 
    для этого далее будет создан новый div и в него уже будет помещен наш клон */

        $("<div>", { class: "divForPdf" }).appendTo("body"); // создадим на странице новый div элемент, добавив ему класс divForPdf(у этого класса уже есть свои стили)

        $(".divForPdf").append(clone); // добавим в ранее созданный div, наш клонированный элемент

        $(".divForPdf") //найдем в нашем новом div элемент с классом h2 и зададим ему меньший размер шрифта(чтобы не делать отдельный класс)
            .find(".h2")
            .css("font-size", "8px");
        let cloneClass = document.querySelector(".cloneClass"); // получим клонированный элемент, который уже лежит в созданном div

        // запишем набор опций. они будут применяться к картинке, которая отрисовывается в pdf. эти свойства взяты из документации к html2pdf js.
        let opt = {
            filename: "receipt.pdf",
            margin: [0.2, 0, 0.2, 0],
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: {
                scale: 2,
                useCORS: true
            },
            jsPDF: {
                orientation: "portrait",
                format: "a4",
                unit: "in"
            }
        };
        await html2pdf() //вызываем сам плагина html2pdf js. К плагину применяем await, для того чтобы подождать пока функция html2pdf отработает и после этого будет продолжено выполнение нашей функции printPDF
            .set(opt) //применяем опции
            .from(cloneClass) //заносим элемент, который будем отрисовывать(в данном случае это наш клон)
            .toPdf()
            .save(); //сохраним файл

        $("div").remove("divForPdf"); //после всех действий, удалим созданный ранее div, со всем содержимым
    };

    $(document).on("click", "#clickPDF", function() {
        $("#clickPDF").css("background-color", "#b4b4b4"); //меняем цвет кнопки, пока она не активна
        $("#clickPDF").prop("disabled", true); //делаем кнопку неактивной, пока не отработает функция
        printPDF(); //вызываем функцию при клике на кнопку
        setTimeout(function() {
            $("#clickPDF").prop("disabled", false); //делаем кнопку активной, после отработки функции
            $("#clickPDF").css("background-color", "#00a00b"); //возвращаем цвет по умолчанию
        }, 100);
    });
});
