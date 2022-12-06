package com.example.hifiprototype;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@NoArgsConstructor
@Setter
@Getter
public class MeetingDTO {
    private int id;
    private String meetingname, participants, location, description;
    private MeetingStatus meetingStatus;
    private LocalDateTime meetingTime, creationTime;

}
