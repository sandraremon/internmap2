<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
//        // Changed 'User' to 'users' to match Laravel standards
        Schema::create('users', function (Blueprint $table) {
            $table->id(); // Auto-incrementing ID
            $table->string('f_name'); // Matches your model $fillable
            $table->string('l_name');
            $table->string('email')->unique();
            $table->string('password'); // Matches your existing database setup
            $table->string('role');

            // Remove $table->timestamps(); if you want to avoid 'updated_at' errors
            // Or keep them and remove 'public $timestamps = false;' from your User model
            $table->timestamps();

            $table->rememberToken();
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            // Updated to reference the 'users' table correctly
            $table->foreignId('user_id')->nullable()->index()->constrained('users');
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
