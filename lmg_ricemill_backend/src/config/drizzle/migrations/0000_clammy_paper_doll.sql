CREATE TYPE "public"."eaccounttype" AS ENUM('customer', 'admin', 'admin_secretary', 'admin_viewer', 'admin_level_one', 'admin_level_two', 'admin_level_three');--> statement-breakpoint
CREATE TYPE "public"."eoriginsite" AS ENUM('facebook', 'shoppee', 'chicberry');--> statement-breakpoint
CREATE TYPE "public"."estatustype" AS ENUM('pending', 'ondelivery', 'success');--> statement-breakpoint
CREATE TABLE "expensetable" (
	"id" serial PRIMARY KEY NOT NULL,
	"expenseid" varchar(255) NOT NULL,
	"username" varchar(255),
	"expense" numeric(10, 2),
	"expensedate" timestamp NOT NULL,
	"memo" text
);
--> statement-breakpoint
CREATE TABLE "installmenttable" (
	"id" serial NOT NULL,
	"transactionid" varchar(255) NOT NULL,
	"agentcode" varchar(255) NOT NULL,
	"installment" numeric(10, 2),
	"isshow" boolean DEFAULT true NOT NULL,
	"description" varchar(255),
	"installmentdate" timestamp DEFAULT now(),
	CONSTRAINT "installmenttable_id_transactionid_pk" PRIMARY KEY("id","transactionid")
);
--> statement-breakpoint
CREATE TABLE "logtable" (
	"id" serial PRIMARY KEY NOT NULL,
	"productid" integer NOT NULL,
	"itemid" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"category" varchar(255) NOT NULL,
	"price" numeric(10, 2) DEFAULT '0.00' NOT NULL,
	"cost" numeric(10, 2) DEFAULT '0.00' NOT NULL,
	"size" varchar(255) NOT NULL,
	"mode" varchar(255) NOT NULL,
	"orderid" varchar(255),
	"logdate" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "ordertable" (
	"id" serial PRIMARY KEY NOT NULL,
	"productid" varchar(255) NOT NULL,
	"transactionid" varchar(255) NOT NULL,
	"agentcode" varchar(255) NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"quantity" integer NOT NULL,
	"isshow" boolean DEFAULT true NOT NULL,
	"transactiondate" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "orderusertable" (
	"id" serial NOT NULL,
	"transactionid" varchar(255) NOT NULL,
	"fullname" varchar(255) DEFAULT '' NOT NULL,
	"agentcode" varchar(255) DEFAULT '' NOT NULL,
	"spouse" varchar(255) DEFAULT '' NOT NULL,
	"address" varchar(255) DEFAULT '' NOT NULL,
	"mobile" varchar(255) DEFAULT '' NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"currentpayment" numeric(10, 2),
	"totalcost" numeric(10, 2),
	"isshow" boolean DEFAULT true NOT NULL,
	"transactiondate" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "orderusertable_id_transactionid_pk" PRIMARY KEY("id","transactionid"),
	CONSTRAINT "unique_transactionid" UNIQUE("transactionid")
);
--> statement-breakpoint
CREATE TABLE "producttable" (
	"id" serial NOT NULL,
	"productid" varchar(6) NOT NULL,
	"agentcode" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"isshow" boolean DEFAULT true NOT NULL,
	"category" varchar(255) NOT NULL,
	"quantity" integer NOT NULL,
	"regdate" timestamp NOT NULL,
	CONSTRAINT "producttable_id_productid_pk" PRIMARY KEY("id","productid"),
	CONSTRAINT "unique_productid" UNIQUE("productid")
);
--> statement-breakpoint
CREATE TABLE "productcategorytable" (
	"id" serial PRIMARY KEY NOT NULL,
	"category" varchar(255) NOT NULL,
	"agentcode" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "replenishmenttable" (
	"id" serial PRIMARY KEY NOT NULL,
	"expenseid" varchar(255) NOT NULL,
	"productid" serial NOT NULL,
	"expense" numeric(10, 2),
	"quantityxxs" integer NOT NULL,
	"quantityxs" integer NOT NULL,
	"quantitys" integer NOT NULL,
	"quantitym" integer NOT NULL,
	"quantityl" integer NOT NULL,
	"quantityxl" integer NOT NULL,
	"quantityxxl" integer NOT NULL,
	"quantity5" integer NOT NULL,
	"quantity55" integer NOT NULL,
	"quantity6" integer NOT NULL,
	"quantity65" integer NOT NULL,
	"quantity7" integer NOT NULL,
	"quantity75" integer NOT NULL,
	"quantity8" integer NOT NULL,
	"quantity85" integer NOT NULL,
	"quantity9" integer NOT NULL,
	"quantity95" integer NOT NULL,
	"quantity100" integer NOT NULL,
	"quantity105" integer NOT NULL,
	"quantity110" integer NOT NULL,
	"quantity115" integer NOT NULL,
	"quantity120" integer NOT NULL,
	"quantitydefault" integer NOT NULL,
	"expensedate" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "replenishmenttable_productid_unique" UNIQUE("productid")
);
--> statement-breakpoint
CREATE TABLE "usertable" (
	"id" serial NOT NULL,
	"lastname" varchar(255) NOT NULL,
	"agentcode" varchar(255) NOT NULL,
	"username" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"salt" char(5) DEFAULT '' NOT NULL,
	"mobile" varchar(11) NOT NULL,
	"email" varchar(255) NOT NULL,
	"token" varchar(100) DEFAULT '' NOT NULL,
	"eaccounttype" "eaccounttype" DEFAULT 'customer',
	"regdate" timestamp NOT NULL,
	"lastdate" timestamp NOT NULL,
	"lastip" varchar(255),
	"lastdevice" varchar(255),
	"lastlocation" varchar(255),
	CONSTRAINT "usertable_id_agentcode_pk" PRIMARY KEY("id","agentcode"),
	CONSTRAINT "usertable_username_unique" UNIQUE("username"),
	CONSTRAINT "usertable_email_unique" UNIQUE("email"),
	CONSTRAINT "unique_agentcode" UNIQUE("agentcode")
);
--> statement-breakpoint
ALTER TABLE "installmenttable" ADD CONSTRAINT "installmenttable_transactionid_orderusertable_transactionid_fk" FOREIGN KEY ("transactionid") REFERENCES "public"."orderusertable"("transactionid") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ordertable" ADD CONSTRAINT "ordertable_productid_producttable_productid_fk" FOREIGN KEY ("productid") REFERENCES "public"."producttable"("productid") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ordertable" ADD CONSTRAINT "ordertable_transactionid_orderusertable_transactionid_fk" FOREIGN KEY ("transactionid") REFERENCES "public"."orderusertable"("transactionid") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "producttable" ADD CONSTRAINT "producttable_agentcode_usertable_agentcode_fk" FOREIGN KEY ("agentcode") REFERENCES "public"."usertable"("agentcode") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "productcategorytable" ADD CONSTRAINT "productcategorytable_agentcode_usertable_agentcode_fk" FOREIGN KEY ("agentcode") REFERENCES "public"."usertable"("agentcode") ON DELETE no action ON UPDATE no action;