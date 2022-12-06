FROM maven:3.8.6-eclipse-temurin-17-alpine
EXPOSE 8080
ADD target/hifiprototype-1.0.0.jar hifiprototype-1.0.0.jar
ENTRYPOINT ["java", "-jar", "/hifiprototype-1.0.0.jar"]