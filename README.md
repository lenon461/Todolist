> ## 접속 및 테스트 URL 
> #### [Todolist](http://34.97.42.76:8016/list)  
    http://34.97.42.76:8016/list


> ## Swagger API
> #### [Todolist-api](http://34.97.42.76:8016/api-docs)
    http://34.97.42.76:8016/api-docs


## 설치 및 빌드 방법 
---

1. 필수 구성요소 설치

~~~
## 필수 구성요소 설치 및 REPO 복사
$ sudo apt-get install git  
$ git clone https://github.com/lenon461/Todolist  
$ cd Todolist  
$ sh schript.sh  

## 필요 모듈 설치
$ npm i  
~~~

2. 데이터베이스 실행
~~~
$ mongo
> use admin  
> db.createUser({ user: 'root', pwd: 'root', roles:['root'] })  
> exit
~~~

3. < .env > 파일 작성
~~~ 
MONGO_ID=root
MONGO_PASSWORD=root
~~~

4. 서버 시작 및 접속
~~~
$ npm start  

localhost:8016/list 로 접속
~~~
