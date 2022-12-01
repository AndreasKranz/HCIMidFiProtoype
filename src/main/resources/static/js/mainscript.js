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

    let frag  = null;

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

    let bigStage = document.getElementById("bigStage")

    bigStage.innerHTML = frag

}

async function openEvent(scheduleId) {
    const url = "http://localhost:8090/vote"
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

    let hiddenDiv = document.getElementById("hiddenDiv")
    document.getElementById("bigStage").innerHTML = "";
    hiddenDiv.innerHTML = frag

    let row = document.getElementById(scheduleId)
    let cells = row.children

    let strName = cells[1].innerHTML;
    let strParticipants = cells[4].innerHTML;
    let strTitle = "Vote on your favorite Date and Time for '" + strName+ "' with " + strParticipants+ "!";

    document.getElementById("votingTitle").innerHTML = strTitle;
    document.getElementById("date2").innerHTML = cells[2].innerHTML + " - " + cells[3].innerHTML;

    document.getElementById("saveScheduleId").innerText = scheduleId;
    document.getElementById("bigStage").innerHTML = hiddenDiv.innerHTML
    hiddenDiv.innerHTML = "";

    let btnSend = document.getElementById("btnSendVote")
    let btnEdit = document.getElementById("btnEditMeet")
    let btnAbsence =  document.getElementById("markAbsence")
    let btnDetails = document.getElementById("btnDetails")

    if (!btnSend.hidden){
        document.getElementById("btnSendVote").hidden = true
    }

    if (btnEdit.hidden){
        console.log("edit btn hidden:",btnEdit.hidden)
        document.getElementById("btnEditMeet").hidden = false
    }

    if (btnAbsence.hidden){
        console.log("show absence!")
        document.getElementById("markAbsence").hidden = false;
    }
    if (btnDetails.hidden){
        document.getElementById("btnDetails").hidden = false
    }


    hiddenDiv.innerHTML = "";
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

    let parts = input.split("-")

    strDate = parts[0]
    strTime = parts[1].substring(1, parts[1].length)

    dateTd.innerHTML = strDate
    timeTd.innerHTML = strTime
    //document.getElementById("result").innerHTML = scheduleRowId;

}

function hideSchedule() {

    let scheduleRowId = document.getElementById("saveScheduleId").innerText;

    switch (scheduleRowId) {
        case "scheduleRow1":
            document.getElementById("scheduleRow1").hidden = true;

            break;
        case "scheduleRow2":
            document.getElementById("scheduleRow2").hidden = true
            break;

        case "scheduleRowHidden":
            document.getElementById("scheduleRowHidden").hidden = true;
            break;
    }

    loadmappic();
}

function checkInputs() {
    let eName = document.getElementById("eName").value;
    let eParticipants = document.getElementById("eParticipants").value;
    let variableInput = document.getElementsByName("necessaryInput").item(0);
    variableInput = variableInput.value;
    console.log("bbb: ", variableInput)

    if (eName == "" || eParticipants == "" || variableInput == "") {
        //alert("You have to fill every input!")
        return -1;
    } else if (eName != "" && eParticipants != "" && variableInput != "") {
        return 0;
    }
    return 1;


}


async function makeMeeting() {

    let eName = document.getElementById("eName").value;
    let verified = checkInputs()

    if (verified == 0) {
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
    } else {
        alert("You have to fill every input!")
    }
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

function loadnaver() {
    var mapOptions = {
        center: new naver.maps.LatLng(37.3595704, 127.105399),
        zoom: 10
    };
    var map = new naver.maps.Map('map', mapOptions);
    console.log("naver map loaded!")
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
            throw new Error("Error! status:, ${response.status}");
        }
        frag = await responsePromise.text();
    } catch (err) {
        console.log(err);
    }

    let bigstage = document.getElementById("bigStage")


    // bigstage.innerHTML = '<img src="/img/hcimap.PNG" alt="testpic">'
    bigstage.innerHTML = frag

    console.log("map html loaded, start naver loading")
    loadnaver()
}

async function loadDetails(scheduleId){

    const url = "http://localhost:8090/details"

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
            throw new Error("Error! status:, ${response.status}");
        }
        frag = await responsePromise.text();
    } catch (err) {
        console.log(err);
    }

    let hiddenDiv = document.getElementById("hiddenDiv");

    hiddenDiv.innerHTML = frag;

    let row = document.getElementById(scheduleId)

    let cells = row.children

    document.getElementById("detailTitle").innerHTML = cells[1].innerHTML
    document.getElementById("detailDate").innerHTML = cells[2].innerHTML
    document.getElementById("detailTime").innerHTML = cells[3].innerHTML
    document.getElementById("detailParticipants").innerHTML = cells[4].innerHTML
    let strLocation = "";
    switch (scheduleId){
        case "scheduleRow1":
            strLocation = "Soccerfield near Ehwa Main Gate";
            break;
        case "scheduleRo2":
            strLocation = "Enigeering Building B Floor 2";
            break;
        default:
            strLocation = "Han River playground";
    }
    document.getElementById("detailLocation").innerHTML = strLocation;


    let bigstage = document.getElementById("bigStage")
    bigstage.innerHTML = hiddenDiv.innerHTML;

    hiddenDiv.innerHTML = "";
}

async function loadPastSchedules() {
    const url = "http://localhost:8090/finished"

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
            throw new Error("Error! status:, ${response.status}");
        }
        frag = await responsePromise.text();
    } catch (err) {
        console.log(err);
    }

    let bigstage = document.getElementById("bigStage")
    bigstage.innerHTML = frag

}

