$(document).ready(function() {
    //�������� �������,������� ����� ��������� ������� � ���� �������� � ����� ����� ����������� pdf ����
    const printPDF = async () => {
        $(".donwloadOk").css("display", "none");

        let element = $("#elementToPrint"), // ������� ����������� ������� �� ��������, ������� ������ ����� �������������� � pdf
            clone = element
                .clone(true) // ��������� ���
                .addClass("cloneClass") // �������� ��� ����� �� �������� ��������� � ����
                .addClass("fontSizePDF"); // �������� ��� �����, �� ������� ������ ��� ����������� ����������� � pdf ���������

        /* ����� �� ����������� � �������������� ��������, ��� ��� �� ��� �� ��������� � DOM, 
    ��� ����� ����� ����� ������ ����� div � � ���� ��� ����� ������� ��� ���� */

        $("<div>", { class: "divForPdf" }).appendTo("body"); // �������� �� �������� ����� div �������, ������� ��� ����� divForPdf(� ����� ������ ��� ���� ���� �����)

        $(".divForPdf").append(clone); // ������� � ����� ��������� div, ��� ������������� �������

        $(".divForPdf") //������ � ����� ����� div ������� � ������� h2 � ������� ��� ������� ������ ������(����� �� ������ ��������� �����)
            .find(".h2")
            .css("font-size", "8px");
        let cloneClass = document.querySelector(".cloneClass"); // ������� ������������� �������, ������� ��� ����� � ��������� div

        // ������� ����� �����. ��� ����� ����������� � ��������, ������� �������������� � pdf. ��� �������� ����� �� ������������ � html2pdf js.
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
        await html2pdf() //�������� ��� ������� html2pdf js. � ������� ��������� await, ��� ���� ����� ��������� ���� ������� html2pdf ���������� � ����� ����� ����� ���������� ���������� ����� ������� printPDF
            .set(opt) //��������� �����
            .from(cloneClass) //������� �������, ������� ����� ������������(� ������ ������ ��� ��� ����)
            .toPdf()
            .save(); //�������� ����

        $("div").remove("divForPdf"); //����� ���� ��������, ������ ��������� ����� div, �� ���� ����������
    };

    $(document).on("click", "#clickPDF", function() {
        $("#clickPDF").css("background-color", "#b4b4b4"); //������ ���� ������, ���� ��� �� �������
        $("#clickPDF").prop("disabled", true); //������ ������ ����������, ���� �� ���������� �������
        printPDF(); //�������� ������� ��� ����� �� ������
        setTimeout(function() {
            $("#clickPDF").prop("disabled", false); //������ ������ ��������, ����� ��������� �������
            $("#clickPDF").css("background-color", "#00a00b"); //���������� ���� �� ���������
        }, 100);
    });
});
