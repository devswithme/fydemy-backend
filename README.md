## Menjalankan project
1. **Clone source code** ke dalam local
	```
	git clone https://github.com/devswithme/fydemy-backend
	cd fydemy-backend
	npm i --legacy-peer-deps
	```
2.  **Install packages** sesuai dengan list versi yang ada di file `package.json`
	```
	npm i --legacy-peer-deps
	``` 
3. **Setup Prisma ORM**
	```
	npx prisma init
	```
4. **Buat user, password dan db baru** melalui mysql, misal seperti ini:
		user: `fydemy_user`
		password: `pwd_123`
		db_name: `fydemy_db`
	```
	mysql -u root -p
	mysql=# CREATE USER fydemy_user WITH PASSWORD 'pwd_123';
	CREATE ROLE
	mysql=# CREATE DATABASE fydemy_db OWNER fydemy_user;
	CREATE DATABASE
	mysql=# GRANT ALL PRIVILEGES ON DATABASE fydemy_db TO fydemy_user;
	GRANT
	```
5.	**Modifikasi file `.env`**. Pastikan mengandung format isi seperti ini:
	```
	APP_PORT=3000
	DATABASE_URL="mysql://[username]:[password]@localhost:3306/[db_name]"
	```
6. **Migrasi dan generate client** prisma dengan
	```
	npx prisma db push
	npx prisma generate
	```
7. **Jalankan project** dengan nodemon
	Kalau belum terinstall nodemon bisa dengan perintah `node .` atau install dengan cara `npm i -g nodemon`
	```
	nodemon .
	```
