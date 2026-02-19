CREATE SCHEMA "auth";
--> statement-breakpoint
CREATE TYPE "booking_status_enum" AS ENUM('pending', 'revised_and_aborted', 'revised_and_confirmed', 'confirmed');--> statement-breakpoint
CREATE TYPE "department_enum" AS ENUM('otolaryngologist', 'general_practitioner', 'cardiologist', 'pediatrics', 'dentist', 'dermatologist', 'ophthalmologist', 'psychiatrist');--> statement-breakpoint
CREATE TABLE "auth"."account" (
	"id" text PRIMARY KEY,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "booking" (
	"id" uuid PRIMARY KEY,
	"user_id" text,
	"patient_name" text NOT NULL,
	"preferred_date" timestamp NOT NULL,
	"suggested_date" timestamp,
	"confirmed_date" timestamp,
	"department" "department_enum" NOT NULL,
	"doctor_code" integer NOT NULL,
	"preferred_follow_up" text,
	"booking_status" "booking_status_enum" DEFAULT 'pending'::"booking_status_enum" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"completed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "auth"."session" (
	"id" text PRIMARY KEY,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL UNIQUE,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "auth"."user" (
	"id" text PRIMARY KEY,
	"name" text NOT NULL,
	"username" text UNIQUE,
	"email" text NOT NULL UNIQUE,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"phone_number" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "auth"."verification" (
	"id" text PRIMARY KEY,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "account_userId_idx" ON "auth"."account" ("user_id");--> statement-breakpoint
CREATE INDEX "idx_public_booking_patientName" ON "booking" ("patient_name");--> statement-breakpoint
CREATE INDEX "idx_public_booking_doctorCode" ON "booking" ("doctor_code");--> statement-breakpoint
CREATE INDEX "idx_public_booking_status" ON "booking" ("booking_status");--> statement-breakpoint
CREATE INDEX "idx_public_booking_createdAt" ON "booking" ("created_at");--> statement-breakpoint
CREATE INDEX "idx_public_booking_updatedAt" ON "booking" ("updated_at");--> statement-breakpoint
CREATE INDEX "idx_public_booking_completedAt" ON "booking" ("completed_at");--> statement-breakpoint
CREATE INDEX "session_userId_idx" ON "auth"."session" ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "uidx_auth_user_username" ON "auth"."user" ("username");--> statement-breakpoint
CREATE INDEX "verification_identifier_idx" ON "auth"."verification" ("identifier");--> statement-breakpoint
ALTER TABLE "auth"."account" ADD CONSTRAINT "account_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."user"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "booking" ADD CONSTRAINT "booking_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."user"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "auth"."session" ADD CONSTRAINT "session_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."user"("id") ON DELETE CASCADE;