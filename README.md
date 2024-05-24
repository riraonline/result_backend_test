# Result of Backend Test Case

## Entities

- Member
- Book

## Route

- Book
  - [ ] `http://localhost:8080/api/books`
- Member
  - [ ] `http://localhost:8080/api/members`

## Package

- [ ] [ExpressJS](https://expressjs.com/)
- [ ] [MongoDB](https://www.mongodb.com/) as Database NoSQL
- [ ] [Mongoose](https://www.mongoosejs.com/)
- [ ] Bcrypt
- [ ] Dotenv
- [ ] Uuid
- [ ] Morgan

---

# JAWABAN ALGORITMA (Menggunakan PHP)

1.

```
<?php

$name = "NEGIE1";

$result = strrev(substr($name, 0, 5)) . "1";
echo $result;

?>
```

2.

```
<?php

function cariKataTerpanjang($kalimat) {
    $kata = explode(' ', $kalimat);
    $panjangKata = 0;
    $kataTerpanjang = [];

    foreach($kata as $k) {
        $panjang = strlen($k);

        if($panjang > $panjangKata) {
            $panjangKata = $panjang;
            $kataTerpanjang = [$k];
        } else if ($panjang == $panjangKata) {
            $kataTerpanjang[] = $k;
        }
    }

    $kataTerpilih = $kataTerpanjang[array_rand($kataTerpanjang)];
    return [$kataTerpilih, $panjangKata];

}

$kalimat = "Saya sangat senang mengerjakan soal algoritma";
[$kataTerpanjang, $jumlahKarakter] = cariKataTerpanjang($kalimat);
echo "Kata terpanjang: $kataTerpanjang ($jumlahKarakter karakter)";

?>
```

3.

```
<?php

function hitungKemunculanKata($input, $query) {
    $output = array_fill_keys($query, 0);

    foreach($input as $kata) {
        if(in_array($kata, $query)) {
            $output[$kata]++;
        }
    }

    return array_values($output);
}

$input = ['xc', 'dz', 'bbb', 'dz'];
$query = ['bbb', 'ac', 'dz'];

$output = hitungKemunculanKata($input, $query);

print_r($output);

?>
```

4.

```
<?php

function selisihDiagonal($matriks) {
    $diagonal1 = 0;
    $diagonal2 = 0;
    $ukuran = count($matriks);

    for ($i = 0; $i < $ukuran; $i++) {
        $diagonal1 += $matriks[$i][$i];        // Jumlah diagonal pertama
        $diagonal2 += $matriks[$i][$ukuran - $i - 1]; // Jumlah diagonal kedua
    }

    return abs($diagonal1 - $diagonal2); // Nilai absolut selisih
}

$matriks = [[1, 2, 0], [4, 5, 6], [7, 8, 9]];
$hasil = selisihDiagonal($matriks);
echo "Selisih diagonal: " . $hasil; // Output: Selisih diagonal: 3


?>
```
