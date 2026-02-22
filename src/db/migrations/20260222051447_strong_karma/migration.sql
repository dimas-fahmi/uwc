ALTER TABLE "booking" ADD COLUMN "patient_birthday" date NOT NULL;--> statement-breakpoint
ALTER TABLE "booking" ALTER COLUMN "doctor_code" SET DATA TYPE text USING "doctor_code"::text;