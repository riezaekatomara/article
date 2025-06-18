const laravelArticleContent = `<p>Laravel merupakan framework PHP modern yang sangat populer di kalangan developer. Jika Anda baru memulai perjalanan web development, Laravel adalah pilihan tepat karena kemudahan penggunaannya dan fitur-fitur canggih yang ditawarkan.</p>

<h2>Apa itu Laravel?</h2>

<p>Laravel adalah framework PHP open-source yang dirilis pertama kali pada tahun 2011 oleh Taylor Otwell. Framework ini mengadopsi pola arsitektur MVC (Model-View-Controller) yang membantu mengorganisir kode dengan lebih terstruktur.</p>

<p>Beberapa keunggulan Laravel:</p>
<ul>
    <li>Sintaks yang elegan dan ekspresif</li>
    <li>Dokumentasi yang sangat lengkap</li>
    <li>Komunitas besar dan aktif</li>
    <li>Banyak package pendukung (Laravel Ecosystem)</li>
</ul>

<h2>Mengapa Memilih Laravel untuk Web Development?</h2>

<h3>1. Sintaks yang Elegan dan Mudah Dipahami</h3>
<p>Laravel memiliki sintaks yang sangat bersih dan intuitif. Sebagai contoh, untuk membuat route sederhana:</p>

<pre><code>Route::get('/welcome', function () {
    return view('welcome');
});</code></pre>

<p>Kode di atas sangat mudah dipahami bahkan untuk pemula sekalipun.</p>

<h3>2. Ecosystem yang Lengkap</h3>
<p>Laravel menyediakan berbagai tools dan package yang memudahkan development:</p>
<ul>
    <li><strong>Eloquent ORM</strong> - Object Relational Mapping yang powerful untuk database</li>
    <li><strong>Blade Template Engine</strong> - Template engine yang fleksibel</li>
    <li><strong>Artisan CLI</strong> - Command line interface untuk automasi</li>
    <li><strong>Migration</strong> - Version control untuk database schema</li>
    <li><strong>Queue System</strong> - Untuk menangani background jobs</li>
</ul>

<h3>3. Keamanan yang Terjamin</h3>
<p>Laravel dilengkapi dengan berbagai fitur keamanan built-in seperti:</p>
<ul>
    <li>Protection terhadap SQL Injection melalui Query Builder dan Eloquent</li>
    <li>CSRF (Cross-Site Request Forgery) protection</li>
    <li>XSS (Cross-Site Scripting) protection</li>
    <li>Authentication dan Authorization system yang robust</li>
</ul>

<h2>Persiapan Sebelum Memulai</h2>

<p>Sebelum menginstall Laravel, pastikan sistem Anda sudah terinstall:</p>
<ul>
    <li>PHP 8.1 atau versi lebih baru</li>
    <li>Composer (dependency manager untuk PHP)</li>
    <li>Database server (MySQL, PostgreSQL, atau SQLite)</li>
</ul>

<h2>Menginstall Laravel</h2>

<p>Laravel bisa diinstall dengan dua cara:</p>

<h3>1. Menggunakan Laravel Installer</h3>
<p>Install Laravel installer global dengan Composer:</p>
<pre><code>composer global require laravel/installer</code></pre>
<p>Kemudian buat project baru:</p>
<pre><code>laravel new nama-project</code></pre>

<h3>2. Menggunakan Composer Create-Project</h3>
<pre><code>composer create-project laravel/laravel nama-project</code></pre>

<h2>Struktur Dasar Laravel</h2>

<p>Setelah menginstall, Anda akan melihat struktur folder berikut:</p>

<ul>
    <li><strong>app/</strong> - Berisi logika aplikasi (Models, Controllers, dll)</li>
    <li><strong>config/</strong> - File konfigurasi aplikasi</li>
    <li><strong>database/</strong> - Migrations, factories, dan seeders</li>
    <li><strong>public/</strong> - Entry point aplikasi</li>
    <li><strong>resources/</strong> - Views, assets, dan file mentah lainnya</li>
    <li><strong>routes/</strong> - File routing aplikasi</li>
</ul>

<h2>Membuat Aplikasi Pertama</h2>

<h3>1. Membuat Route</h3>
<p>Buka file <code>routes/web.php</code> dan tambahkan route baru:</p>
<pre><code>Route::get('/hello', function () {
    return 'Hello World!';
});</code></pre>
<p>Jalankan server dengan <code>php artisan serve</code> dan buka <code>http://localhost:8000/hello</code></p>

<h3>2. Membuat Controller</h3>
<p>Gunakan Artisan untuk membuat controller:</p>
<pre><code>php artisan make:controller WelcomeController</code></pre>
<p>Buat method di controller:</p>
<pre><code>public function index()
{
    return view('welcome');
}</code></pre>
<p>Daftarkan route ke controller:</p>
<pre><code>Route::get('/welcome', [WelcomeController::class, 'index']);</code></pre>

<h3>3. Membuat View</h3>
<p>Buat file <code>resources/views/welcome.blade.php</code>:</p>
<pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Welcome&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Welcome to My App!&lt;/h1&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>

<h3>4. Menggunakan Database</h3>
<p>Konfigurasi database di <code>.env</code>:</p>
<pre><code>DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nama_database
DB_USERNAME=root
DB_PASSWORD=</code></pre>

<p>Buat model dan migration:</p>
<pre><code>php artisan make:model Post -m</code></pre>
<p>Edit file migration:</p>
<pre><code>public function up()
{
    Schema::create('posts', function (Blueprint $table) {
        $table->id();
        $table->string('title');
        $table->text('content');
        $table->timestamps();
    });
}</code></pre>
<p>Jalankan migration:</p>
<pre><code>php artisan migrate</code></pre>

<h3>5. CRUD dengan Eloquent</h3>
<p>Eloquent adalah ORM Laravel untuk berinteraksi dengan database:</p>
<pre><code>// Membuat post baru
$post = new Post;
$post->title = 'Judul Post';
$post->content = 'Isi konten post';
$post->save();

// Mengambil semua post
$posts = Post::all();

// Mengupdate post
$post = Post::find(1);
$post->title = 'Judul Baru';
$post->save();

// Menghapus post
$post = Post::find(1);
$post->delete();</code></pre>

<h2>Fitur-Fitur Keren Laravel</h2>

<h3>1. Blade Templating</h3>
<p>Blade adalah template engine Laravel yang powerful:</p>
<pre><code>@extends('layouts.app')

@section('content')
    &lt;h1&gt;{{ $title }}&lt;/h1&gt;
    @if($posts->count() > 0)
        @foreach($posts as $post)
            &lt;div&gt;{{ $post->title }}&lt;/div&gt;
        @endforeach
    @else
        &lt;p&gt;Tidak ada post&lt;/p&gt;
    @endif
@endsection</code></pre>

<h3>2. Authentication</h3>
<p>Laravel menyediakan sistem autentikasi siap pakai:</p>
<pre><code>php artisan make:auth</code></pre>

<h3>3. File Storage</h3>
<p>Mudah mengelola file upload:</p>
<pre><code>// Menyimpan file
$path = $request->file('avatar')->store('avatars');

// Mengambil file
return Storage::download('file.jpg');</code></pre>

<h2>Tips untuk Pemula</h2>

<ol>
    <li>Pelajari PHP dasar sebelum memulai Laravel</li>
    <li>Gunakan dokumentasi resmi sebagai referensi utama</li>
    <li>Ikuti coding standards Laravel</li>
    <li>Manfaatkan Artisan CLI untuk mempercepat development</li>
    <li>Bergabung dengan komunitas Laravel Indonesia</li>
</ol>

<h2>Kesimpulan</h2>

<p>Laravel adalah framework yang sempurna untuk memulai pengembangan web modern. Dengan fitur-fitur lengkap dan dokumentasi yang baik, Laravel memudahkan developer baik pemula maupun berpengalaman untuk membangun aplikasi web yang powerful.</p>

<p>Mulailah dengan project sederhana, pahami konsep dasar MVC, routing, dan Eloquent ORM. Setelah itu, Anda bisa menjelajahi fitur-fitur advanced seperti API development, testing, dan deployment.</p>

<p>Selamat belajar dan happy coding!</p>`;

export const initialArticles = [
  {
    id: "laravel-panduan-lengkap-pemula",
    title:
      "Laravel untuk Pemula: Panduan Lengkap dari Dasar hingga Membuat Aplikasi",
    author: "Admin CodeCraft Indo",
    authorId: 1,
    date: "2025-06-18",
    tags: ["laravel", "web development", "pemula", "php", "tutorial", "crud"],
    content: laravelArticleContent,
  },
  {
    id: "react-hooks-dasar",
    title: "Pengenalan React Hooks: useState dan useEffect",
    author: "Jane Smith",
    authorId: 2,
    date: "2025-06-15",
    tags: ["react", "frontend", "pemula"],
    content: `
      <h2>Apa itu React Hooks?</h2>
      <p>React Hooks adalah fungsi yang memungkinkan Anda "mengaitkan" state dan fitur lifecycle React dari komponen fungsional...</p>
      
      <h3>useState</h3>
      <p>Hook <code>useState</code> digunakan untuk menambahkan state lokal ke komponen fungsional...</p>
      <pre><code>import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
</code></pre>

      <h3>useEffect</h3>
      <p>Hook <code>useEffect</code> memungkinkan Anda melakukan efek samping dalam komponen fungsional. Ini adalah kombinasi dari <code>componentDidMount</code>, <code>componentDidUpdate</code>, dan <code>componentWillUnmount</code> dalam komponen kelas.</p>
    `,
  },
];
