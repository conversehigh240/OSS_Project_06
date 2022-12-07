## Installation and Current status

1. 필요한 모듈 설치
  - npm init -y
  - npm i express --save
  - npm i mysql --save
  - npm i nodemon --save (서버를 끄지 않고 계속 켜져있는 상태에서도 코드 수정을 가능케함)


2. MySQL workbench가 계속 오류나는 관계로 MySQL command line client(필요하다면 설치해야함)에서 데이터베이스 접속해서 확인
- https://ansan-survivor.tistory.com/1130 (설치과정과 사용법)


3. 코드상에서 주석 처리된 부분은 데이터베이스, 테이블 그리고 json파일에서 값을 insert하는 과정을 한번 했기 때문에 다시 생성할 필요가 없음


4. 코드 실행하고 http://localhost:8080/db 에서 데이터베이스에 있는 모든 가수 이름과 아이디 확인 가능
