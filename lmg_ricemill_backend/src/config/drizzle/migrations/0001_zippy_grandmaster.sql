ALTER TABLE "installmenttable" DROP CONSTRAINT "installmenttable_transactionid_orderusertable_transactionid_fk";
--> statement-breakpoint
ALTER TABLE "ordertable" DROP CONSTRAINT "ordertable_transactionid_orderusertable_transactionid_fk";
