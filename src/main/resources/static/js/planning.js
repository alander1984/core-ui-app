$("nav li.cil").each(function () {
    $(this).removeClass("darkerlishadow");
});
$("nav li.cil.menu-planning").addClass("darkerlishadow");

$(".worktab").click(function() {
    $(".worktab").each(function () {
        $(this).removeClass("active");
    });
    $(".workPanel").each(function () {
        $(this).addClass("hidden");
    });
    $(this).addClass("active");
    $($(this).data("tab")).removeClass("hidden");
})