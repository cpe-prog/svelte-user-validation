CREATE TABLE `sessions` (
	`id` text(100) PRIMARY KEY NOT NULL,
	`user_id` text(100) NOT NULL,
	`expires_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text(100) PRIMARY KEY NOT NULL,
	`provider` text NOT NULL,
	`provider_id` text(255) NOT NULL,
	`first_name` text(100) NOT NULL,
	`last_name` text(100) NOT NULL,
	`role` text NOT NULL,
	`email` text(100) NOT NULL,
	`username` text(100) NOT NULL,
	`hash_password` text(255),
	`avatar_url` text(255)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_id_unique` ON `users` (`id`);