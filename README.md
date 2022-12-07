# Spotify에 등록된 Artist의 상위 차트 분석 서비스

## Description

이 프로젝트는 Spotify 음반 검색 서비스 API를 사용하여, 원하는 가수를 입력하면 해당 가수의 인기 음반과 해당 음반들의 특징을 통계적 그래프로 가시화하여 보여줌으로서, 인기 있는 음반의 성공 요인을 분석하는 것을 도와주는 기능을 하는 서비스 입니다. 뿐만 아니라, 해당 가수의 특징과 유사한 가수들의 목록을 보여줌으로서, 유사한 특징을 가진 아티스트의 정보를 알려주는 기능 또한 하고 있습니다.

### Built with

- NodeJS with Express
- Spotify API
- Mysql (Database)
- AWS (Server Host)

## Installation

### About app.js

해당 내용은 서비스를 제공하는 Server side 개발자에게 필요한 부분입니다. 서비스를 제공받는 Client분들은 이 부분을 건너 뛰셔도 괜찮습니다.

1. 프로젝트를 다운받고, 프로젝트 디렉토리로 진입하여 terminal에 아래 순서대로 입력
  - npm install
  - npm install express --save
  - npm install spotify-web-api-node --save
  - npm install ejs
  
2. 소스코드의 client_id와 secret에 제공받은 값 넣기 (기본적으로 채워져있는 값이 문제가 없다면, 건너뛰어도 무방)

3. node 명령어 혹은 VScode 등으로 코드를 실행하여 서버 구축

### About db.js

1. 필요한 모듈 설치
  - npm init -y
  - npm i express --save
  - npm i mysql --save
  - npm i nodemon --save (서버를 끄지 않고 계속 켜져있는 상태에서도 코드 수정을 가능케함)

2. MySQL workbench가 계속 오류나는 관계로 MySQL command line client(필요하다면 설치해야함)에서 데이터베이스 접속해서 확인
- https://ansan-survivor.tistory.com/1130 (설치과정과 사용법)

3. 코드상에서 주석 처리된 부분은 데이터베이스, 테이블 그리고 json파일에서 값을 insert하는 과정을 한번 했기 때문에 다시 생성할 필요가 없음

4. 코드 실행하고 http://localhost:8080/db 에서 데이터베이스에 있는 모든 가수 이름과 아이디 확인 가능

## Usage

1. 서비스의 주소와 포트인 http://44.198.134.201:8888/ 를 브라우저에 입력하여 접속

2. 검색창에 원하는 가수의 이름을 입력 (정확한 이름은 DB를 참고할 것)

3. 결과를 확인

## Contributing

아직 부족한 점이 많은 서비스인 만큼, 사용자 분들의 버그 개선 사항 제보 및 Pull request는 저희에게 큰 도움이 됩니다. 아래의 과정을 따라 진행하신 후, PR을 보내주시면, 저희의 검토 후 소스코드에 반영하도록 하겠습니다.

1. 프로젝트를 fork 합니다
2. feature/{feature} 브랜치를 새로 만듭니다.  (git checkout -b feature/{feature})
3. commit과 push를 진행합니다.
4. PR (Pull Request)를 보내주시면, 이후 검토 후 반영하도록 하겠습니다.

## License

MIT License Copyright(c)

## Contact

궁금한 점이 있으시면, 아래의 주소로 연락주시기 바랍니다.

이철한 : herrtane@khu.ac.kr
김지애 : theyummy@khu.ac.kr
서양하 : didgk0823@khu.ac.kr
김남호 : shawnbest@khu.ac.kr
강지호 : jiho9487@khu.ac.kr
이상혁 : omg0mg@khu.ac.kr
