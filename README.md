## http://34.97.42.76:8016/list 주소로 접속시 데모실행가능
## http://34.97.42.76:8016/api-docs 주소로 swagger API제공

### 1. 실행방법
---
1. sudo apt-get install git  
   git clone https://github.com/lenon461/Todolist  
   cd Todolist  
   sh script.sh  

2. npm i  

3. mongo 실행 및 유저 등록  
~~~
  use admin  
  db.createUser({ user: 'root', pwd: 'root', roles:['root'] })  
  exit
~~~

4. <.env> 파일 작성
~~~
MONGO_ID=root
MONGO_PASSWORD=root

~~~
5. npm start

6. localhost:8016/list 로 접속
