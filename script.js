(function () {
    var currentPlayer = "player1";
    var currentPlayerBox = $(".current-player");
    var column = ".column";
    var winnerBox = $(".winner-box"); // div for winner message
    var slots = $(".slot");
    var htmlForWinner = "";
    var resetBtn = $(".reset-game"); // button to reset game
    var hole = $(".hole");
    htmlForPlayer = "";
    var pTextPlayer = $(".player");

    var audio = new Audio("Shantay you stay.m4a");

    $(".column").on("click", function (e) {
        var col = $(e.currentTarget);
        // console.log(slots);
        var slotsInCol = col.children();
        var colIdx = $(".column").index(col);
        var nextColIdx = colIdx + 1;

        for (var i = slotsInCol.length - 1; i >= 0; i--) {
            if (
                !slotsInCol.eq(i).hasClass("player1") &&
                !slotsInCol.eq(i).hasClass("player2")
            ) {
                slotsInCol.eq(i).addClass(currentPlayer);

                break; // ends loop
            }
        }
        var slotsInRow = $(".row" + i);

        if (checkForVictory(slotsInCol)) {
            $(winnerBox.addClass("on"));
            audio.play();
            // animation winner message
        } else if (checkForVictory(slotsInRow)) {
            audio.play();
            $(winnerBox.addClass("on")); // animation winner message
        } else if (checkForVictory(slots)) {
            audio.play();
            $(winnerBox.addClass("on"));
        }

        switchPlayer();

        console.log(col.index() + 1);
        console.log(col.next().index());

        // var isAdjacent = function isAdjacent() {
        //     for (var i = 0; i < slots.length; i++) {
        //         if (
        //             (slots.hasClass("player1") &&
        //                 col.index() + 1 == col.next().index()) ||
        //             (slots.hasClass("player2") &&
        //                 col.index() + 1 == col.next().index())
        //         ) {
        //             return true;
        //         }
        //     }
        // };
        // isAdjacent();
    });

    function switchPlayer() {
        if (currentPlayer === "player1") {
            currentPlayer = "player2";
            $(pTextPlayer).text(currentPlayer);
            $(currentPlayerBox).css({
                "background-color": "white",
                color: "hotpink",
            });
        } else {
            currentPlayer = "player1";
            $(pTextPlayer).text(currentPlayer);
            $(currentPlayerBox).css({
                "background-color": "hotpink",
                color: "white",
            });
        }
    }

    function checkForVictory(slots) {
        var counter = 0;
        for (var i = 0; i < slots.length; i++) {
            // console.log(slots.length);
            if (slots.eq(i).hasClass(currentPlayer)) {
                counter++;
                if (counter === 4) {
                    htmlForWinner +=
                        "<p class='winner'>" +
                        currentPlayer +
                        " , shantay you stay!</p>";

                    winnerBox.html(htmlForWinner);

                    return true;
                }
            } else {
                counter = 0;
            }

            if (
                (slots.eq(i).hasClass(currentPlayer) &&
                    slots.eq(i + 7).hasClass(currentPlayer) &&
                    slots.eq(i + 14).hasClass(currentPlayer) &&
                    slots.eq(i + 21).hasClass(currentPlayer)) ||
                (slots.eq(i).hasClass(currentPlayer) &&
                    slots.eq(i + 5).hasClass(currentPlayer) &&
                    slots.eq(i + 10).hasClass(currentPlayer) &&
                    slots.eq(i + 15).hasClass(currentPlayer))
            ) {
                htmlForWinner +=
                    "<p class='winner'>" +
                    currentPlayer +
                    " , shantay you stay!</p>";

                winnerBox.html(htmlForWinner);

                return true;
            }
        }
    }

    $(resetBtn).on("click", function (e) {
        $(hole).parent().removeClass("player1");
        $(hole).parent().removeClass("player2");
        winnerBox.removeClass("on");
        switchPlayer();
    });

    // function isAdjacent() {
    //     for (var i = 0; i < slots.length; i++) {
    //         //     if (
    //         //         slots.eq(i).parent().index() + 1 ===
    //         //             slots
    //         //                 .eq(i + 7)
    //         //                 .parent()
    //         //                 .next() &&
    //         //         slots
    //         //             .eq(i + 7)
    //         //             .parent()
    //         //             .index() +
    //         //             1 ===
    //         //             slots
    //         //                 .eq(i + 14)
    //         //                 .parent()
    //         //                 .next() &&
    //         //         slots
    //         //             .eq(i + 14)
    //         //             .parent()
    //         //             .index() === slots.eq(i + 21).parent().next
    //         //     ) {
    //         //         return true;
    //         //     }
    //         // }
    //     }
    // }
    // isAdjacent();
})();
