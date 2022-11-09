//document.getElementById("btnTimeKnown").addEventListener('click', () => loadTimeKnownForm());

let selectedOption = 0

async function openVoting() {

    const url = 'http://localhost:8090/vote';

    let frag;

    try {
        const responsePromise = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'html'
            }
        })
        if (!responsePromise.ok) {
            throw new Error("Error! status: ${response.status}");
        }
        frag = await responsePromise.text();
    } catch (err) {
        console.log(err);
    }

    let bigStage = document.getElementById("bigStage")

    bigStage.innerHTML = frag
}

function crossDate(lblid) {
    let lblcontent = document.getElementById(lblid).innerText;

    document.getElementById(lblid).innerHTML = "<del>" + lblcontent + "</del>";

}

function uncrossDate(lblid) {
    let lblcontent = document.getElementById(lblid).innerText;

    document.getElementById(lblid).innerHTML = lblcontent;

}

function UnCrossDates() {
    let radios1 = document.getElementsByName("favTimeOpt1")

    for (let radios1Element of radios1) {
        //radios1Element.onclick = uncrossDate("radiolbl1")
        radios1Element.addEventListener('click', () => uncrossDate("radiolbl1")) //= uncrossDate("radiolbl1")
    }

    let radios2 = document.getElementsByName("favTimeOpt2")

    for (let radios2Element of radios2) {
        //radios2Element.onclick = uncrossDate("radiolbl2")
        radios2Element.addEventListener('click', () => uncrossDate("radiolbl2"))
    }

    let radios3 = document.getElementsByName("favTimeOpt3")

    for (let radios3Element of radios3) {
        //radios3Element.onclick(uncrossDate("radiolbl3")) //= uncrossDate("radiolbl3")
        radios3Element.addEventListener('click', () => uncrossDate("radiolbl3"))
    }

    document.getElementById("radio1_X").addEventListener('click', () => crossDate("radiolbl1"))
    document.getElementById("radio2_X").addEventListener('click', () => crossDate("radiolbl2"))
    document.getElementById("radio3_X").addEventListener('click', () => crossDate("radiolbl3"))

}

function getRadioResults() {
    let opt1, opt2, opt3;
    let rating1, rating2, rating3;

    opt1 = document.getElementsByName("favTimeOpt1")
    opt2 = document.getElementsByName("favTimeOpt2")
    opt3 = document.getElementsByName("favTimeOpt3")

    for (let i = 0; i < opt1.length; i++) {
        if (opt1[i].checked) {
            rating1 = opt1[i].value;
        }
    }

    for (let i = 0; i < opt2.length; i++) {
        if (opt2[i].checked) {
            rating2 = opt2[i].value;
        }
    }
    for (let i = 0; i < opt3.length; i++) {
        if (opt3[i].checked) {
            rating3 = opt3[i].value;
        }
    }

    if (rating1 == undefined || rating2 == undefined || rating3 == undefined) {
        alert("You have to vote for every available date and time!")
    }

    let Rs = [rating1, rating2, rating3]
    console.log(Rs)

    let fav = -1;

    for (let i = 3; i > 0; i--) {
        for (let j = 0; j < Rs.length; j++) {
            if (Rs[j] == i) {
                fav = j;
                break;

            }
        }
        if (fav != -1) {
            break;
        }
    }
    let outputDate = "";

    console.log(fav)
    switch (fav) {
        case 0:
            outputDate = document.getElementById("radiolbl1").innerText;
            //addScheduleRow(outputDate)
            break;
        case 1:
            outputDate = document.getElementById("radiolbl2").innerText;
            //addScheduleRow(outputDate)
            break;
        case 2:
            outputDate = document.getElementById("radiolbl3").innerText;
            //addScheduleRow(outputDate)
            break;

        default:

            break;
    }
    return outputDate;
}

function addScheduleRow() {

    let input = getRadioResults()

    let dateTd = document.getElementById("DateCell2")
    let timeTd = document.getElementById("TimeCell2")

    let strDate, strTime;

    let startIndex = input.indexOf("|")

    input = input.substring((startIndex + 2), input.length)

    let parts = input.split("-")

    strDate = parts[0]
    strTime = parts[1].substring(1, parts[1].length)

    dateTd.innerHTML = strDate
    timeTd.innerHTML = strTime

    document.getElementById("scheduleRowHidden").hidden = false


    console.log(strDate)
    console.log(strTime)
}

function editExistingMeet() {
    let input = getRadioResults()

    let dateTd;
    let timeTd;

    let scheduleRowId = document.getElementById("saveScheduleId").innerText;

    switch (scheduleRowId) {
        case "scheduleRow1":
            dateTd = document.getElementById("DateCell0")
            timeTd = document.getElementById("TimeCell0")
            break;
        case "scheduleRow2":
            dateTd = document.getElementById("DateCell1")
            timeTd = document.getElementById("TimeCell1")
            break;

        case "scheduleRowHidden":
            dateTd = document.getElementById("DateCell2")
            timeTd = document.getElementById("TimeCell2")
            break;
    }

    let strDate, strTime;

    let startIndex = input.indexOf("|")

    input = input.substring((startIndex + 2), input.length)

    let parts = input.split("-")

    strDate = parts[0]
    strTime = parts[1].substring(1, parts[1].length)

    dateTd.innerHTML = strDate
    timeTd.innerHTML = strTime
    //document.getElementById("result").innerHTML = scheduleRowId;

}

async function makeMeeting() {

    let eName = document.getElementById("eName").value;
    console.log(eName)
    //let eParticipants = document.getElementById("eParticipants").value


    let str = "Sucess! You have sent the voting for the meeting '" + eName + "' to the participants!"


    const url = "http://localhost:8090/success"

    let frag;

    try {
        const responsePromise = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'html'
            }
        })
        if (!responsePromise.ok) {
            throw new Error("Error! status: ${response.status}");
        }
        frag = await responsePromise.text();
    } catch (err) {
        console.log(err);
    }

    let hiddenDiv = document.getElementById("bigStage").innerHTML = frag;

    console.log(str)

    document.getElementById("confirmH2").innerHTML = str

    //document.getElementById("bigStage").innerHTML = hiddenDiv.innerHTML;
}

async function openEvent(scheduleId) {

    const url = "http://localhost:8090/vote"

    let frag;

    try {
        const responsePromise = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'html'
            }
        })
        if (!responsePromise.ok) {
            throw new Error("Error! status: ${response.status}");
        }
        frag = await responsePromise.text();
    } catch (err) {
        console.log(err);
    }

    let hiddenDiv = document.getElementById("hiddenDiv")

    hiddenDiv.innerHTML = frag

    //TODO die Werte im Voting an Schedule row anpassen
    let row = document.getElementById(scheduleId)

    let cells = row.children

    let concatDateTime = cells[2].innerHTML + " - " + cells[3].innerHTML;

    document.getElementById("radiolbl2").innerHTML = "3 | " + concatDateTime;

    document.getElementById("btnSendVote").hidden = true
    document.getElementById("btnEditMeet").hidden = false

    document.getElementById("saveScheduleId").innerText = scheduleId;

    let absLbls = document.getElementsByName("absence")

    for (let i = 0; i < absLbls.length; i++) {
        absLbls[i].hidden = false
    }

    document.getElementById("radio1_X").hidden = false;
    document.getElementById("radio2_X").hidden = false;
    document.getElementById("radio3_X").hidden = false;

    let bigstagee = document.getElementById("bigStage").innerHTML = hiddenDiv.innerHTML

    UnCrossDates()
}

async function loadLocKnownForm() {
    const url = 'http://localhost:8090/locform';

    let frag;

    try {
        const responsePromise = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'html'
            }
        })
        if (!responsePromise.ok) {
            throw new Error("Error! status: ${response.status}");
        }
        frag = await responsePromise.text();
    } catch (err) {
        console.log(err);
    }


    let bigStage = document.getElementById("bigStage")

    bigStage.innerHTML = "";
    bigStage.innerHTML = frag;
}

async function loadTimeKnownForm() {
    const url = 'http://localhost:8090/timeform';

    let frag;

    try {
        const responsePromise = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'html'
            }
        })
        if (!responsePromise.ok) {
            throw new Error("Error! status: ${response.status}");
        }
        frag = await responsePromise.text();
    } catch (err) {
        console.log(err);
    }


    let bigStage = document.getElementById("bigStage")

    bigStage.innerHTML = "";
    bigStage.innerHTML = frag;
}

async function loadmappic() {
    const url = "http://localhost:8090/map"

    let frag;

    try {
        const responsePromise = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'html'
            }
        })
        if (!responsePromise.ok) {
            throw new Error("Error! status: ${response.status}");
        }
        frag = await responsePromise.text();
    } catch (err) {
        console.log(err);
    }

    let bigstage = document.getElementById("bigStage")

    // bigstage.innerHTML = '<img src="/img/hcimap.PNG" alt="testpic">'
    bigstage.innerHTML = frag
}

