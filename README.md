# agency-task

## Install application
```text
git clone https://github.com/SyntaxErrorLineNULL/agency-task.git
cd agency-task/
npm install
and..
```
###**If you have Docker installed**
```
make init 
or 
docker-compose -f docker-compose.yaml up -d
```
###**or add your URL connection for MongoDB**
```typescript
try {
    connect(`Link MongoDB URL connection`);
} ...
```

Start app
```text
npm build
npm start
```

###Next, you will receive a notification in the terminal on which port the application will be launched.