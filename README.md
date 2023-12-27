# 객체 탐지를 통한 예인 수조 안전시스템

### 프로젝트 소개
백엔드 개발 및 Yolov5 fine-tuning : 총 1인
하드웨어 개발 : 총 1인
프론트엔드 개발 : 총 1인

environment : Github, Google Colab, Visual Studio Code, Linux

hardware : Raspberry Pi 4, web cam

Object detection : ultralytics/yolov5

backend tech : NestJS

frontend tech : React JS

devops tech : EC2, DynamoDB (using DynamoDB Streams),AWS Lambda, AWS SNS & SMS, AWS Lambda

해당 프로젝트는 예인 수조 작업장 환경에서 작업자가 쓰러진 경우 제빠른 대처를 통한 인명사고 방지하기 위해 고안되었으며, AI와 클라우드를 결합하여 직업자의 신변 안전을 보장 할 수 있도록 개발된 프로젝트입니다.
작업자 쓰러짐 감지시 관련 정보를 서버에 전송하고, 관계자들에게 비상상황 알림 문자를 발송합니다.
기존 쓰러짐 탐지 정보 로그를 확인할 수 있도록 데이터베이스에 영속하여 관리자 페이지를 통해 확인할 수 있도록 합니다.


### Overall Architecture
![capstone-architecture drawio](https://github.com/capstone-secure-system/capstone-backend/assets/80220062/ceea4cbf-c3bf-4999-a204-c27f6d8bcdd5)
