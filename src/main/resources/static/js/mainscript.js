//document.getElementById("btnTimeKnown").addEventListener('click', () => loadTimeKnownForm());

let selectedOption = 0

function search() {
    var location = document.getElementById("selectedLocation");
    let locationInput = document.getElementById("keyword");
    locationInput.value = "Ewha Womans University"
    location.innerHTML = "Ewha Womans University";

    document.getElementById("locationHelp").hidden = true;
}

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

    UnCrossDates()
}

function crossDate(thId) {
    let thcontent = document.getElementById(thId).innerText;

    console.log("thcontent" + thcontent)

    document.getElementById(thId).innerHTML = "<del>" + thcontent + "</del>";
}

function uncrossDate(lblid) {
    let thcontent = document.getElementById(lblid).innerText;

    document.getElementById(lblid).innerHTML = thcontent;

}

function UnCrossDates() {

    document.getElementById("btnDel1").addEventListener('click', () => crossDate("date1"))
    document.getElementById("btnDel2").addEventListener('click', () => crossDate("date2"))
    document.getElementById("btnDel3").addEventListener('click', () => crossDate("date3"))
}

function getRangeResults() {

    let opt1, opt2, opt3;
    let rating1, rating2, rating3;

    opt1 = document.getElementById("preferTime1")
    opt2 = document.getElementById("preferTime2")
    opt3 = document.getElementById("preferTime3")

    rating1 = opt1.value
    rating2 = opt2.value
    rating3 = opt3.value


    /* if (rating1 == undefined || rating2 == undefined || rating3 == undefined) {
         alert("You have to vote for every available date and time!")
     }*/

    let Rs = [rating1, rating2, rating3]
    console.log(Rs)

    let fav = -1;

    for (let i = 5; i > 0; i--) {
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
            outputDate = document.getElementById("date1").innerText;
            break;
        case 1:
            outputDate = document.getElementById("date2").innerText;
            break;
        case 2:
            outputDate = document.getElementById("date3").innerText;
            break;
        default:

            break;
    }
    return outputDate;
}

function addScheduleRow() {

    let input = getRangeResults()
    console.log(input)

    let dateTd = document.getElementById("DateCell2")
    let timeTd = document.getElementById("TimeCell2")

    let strDate, strTime;

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
    let input = getRangeResults()

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

function checkInputs() {
    let eName = document.getElementById("eName").value;
    let eParticipants = document.getElementById("eParticipants").value;
    let variableInput = document.getElementsByName("necessaryInput").item(0);
    variableInput = variableInput.value;
    console.log("bbb: ", variableInput)

    if (eName == "" || eParticipants == ""|| variableInput == "") {
        alert("You have to fill every input!")
        return false;
    }
    return true;
}


async function makeMeeting() {

    let eName = document.getElementById("eName").value;
    verified = checkInputs()

    if (verified) {

        /*let obj = {
            taskTitle: title,
            tdescription: description,
            assignedEmail: assignee,
            tpriority: prio,
        }

        let createPayload = JSON.stringify(obj);
    */

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

        document.getElementById("bigStage").innerHTML = frag;

        console.log(str)

        document.getElementById("confirmH2").innerHTML = str
    }
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

    let row = document.getElementById(scheduleId)

    let cells = row.children

    document.getElementById("date2").innerHTML = cells[2].innerHTML + " - " + cells[3].innerHTML;

    document.getElementById("btnSendVote").hidden = true
    document.getElementById("btnEditMeet").hidden = false

    document.getElementById("saveScheduleId").innerText = scheduleId;
    document.getElementById("bigStage").innerHTML = hiddenDiv.innerHTML

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

