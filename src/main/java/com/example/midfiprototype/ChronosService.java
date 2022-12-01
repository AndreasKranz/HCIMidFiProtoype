package com.example.midfiprototype;

import org.springframework.stereotype.Service;

import java.io.*;
import java.time.LocalDateTime;
import java.util.ArrayList;

@Service
public class ChronosService {

    public ArrayList<Meeting> editMeeting(ArrayList<Meeting> tempList, MeetingDTO changeDTO){
        for (Meeting m: tempList) {
            if (m.getId() == changeDTO.getId()) {
                m.setMeetingName(changeDTO.getMeetingname());
                m.setDescription(changeDTO.getDescription());
                m.setLocation(changeDTO.getLocation());
                m.setMeetingStatus(changeDTO.getMeetingStatus());
                m.setParticipants(changeDTO.getParticipants());
                m.setMeetDateTime(changeDTO.getMeetingTime());
            }
        }
        return tempList;
    }

    public ArrayList<Meeting> loadMeetings(){
        ArrayList<Meeting> output = new ArrayList<>();

        /*try {
            BufferedReader reader = new BufferedReader(new FileReader(System.getenv("USERPROFILE")+"\\Downloads\\outputtest.csv"));
            String[] splitted;
            String line = "";
            MeetingStatus meetingStatus;

            line = reader.readLine();

            while ((line = reader.readLine()) != null) {
                splitted = line.split(";");

                switch (splitted[7]){
                    case "FINISHED":
                        meetingStatus = MeetingStatus.FINISHED;
                        break;
                    case "ABSENT":
                        meetingStatus = MeetingStatus.ABSENT;
                        break;
                    case "IN_VOTING":
                        meetingStatus = MeetingStatus.IN_VOTING;
                        break;
                    case "SCHEDULED":
                        meetingStatus = MeetingStatus.IN_VOTING;
                        break;
                    default:
                        meetingStatus = MeetingStatus.IN_VOTING;

                }
                output.add(new Meeting(Integer.parseInt(splitted[0]),splitted[1],splitted[2],LocalDateTime.parse(splitted[3]),LocalDateTime.parse(splitted[4]),splitted[5],splitted[6],meetingStatus));
            }
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
*/
        return output;
    }

    public void saveMeeting(ArrayList<Meeting> input){
        File outputCsv = new File(System.getenv("USERPROFILE") + "\\Downloads\\outputtest.csv");

        /*try{
            BufferedWriter writer = new BufferedWriter(new FileWriter(outputCsv));

            writer.write("id,meetingName,participants,meetDateTime,creationTime,location,description,meetingStatus");
            writer.newLine();

            for (Meeting m : input) {
                writer.write(m.toCsvString());
            }

            writer.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

*/
    }


}
