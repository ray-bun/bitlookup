# Help your user find their bitcloker key faster

You'll need to extract the BitLocker keys from Active Directory / Intune and then populate the keys.csv file
Demo at: https://bitlookup.net/

# How do use it

```
git clone https://github.com/ray-bun/bitlookup

```

Rename: sample.env to .env and update CSV_FILEPATH file path

```
npm install
npm run dev

```

# Sample CSV

```
machine_serial,key_1,key_2
111111,556039-021384-640156-357302-043318-622193-214049-084172,084172-556039-622193-640156-357302-021384-214049-043318
222222,622193-640156-084172-556039-357302-043318-021384-214049,622193-084172-021384-214049-556039-640156-357302-043318
333333,640156-084172-622193-043318-556039-214049-021384-357302,622193-214049-084172-556039-640156-043318-357302-021384
444444,084172-556039-622193-043318-640156-214049-357302-021384,084172-640156-214049-622193-021384-043318-556039-357302
666666,214049-084172-043318-622193-640156-021384-556039-357302,084172-043318-622193-214049-556039-021384-640156-357302
```

# API endpoint

```
https://bitlookup.net/search/111111
http://localhost/search/111111
```

# Powershell script

```
https://gist.github.com/ray-bun/b6fdf1e77282862665b597dc3f1765dc
```

# Bootable USB

```
https://www.hirensbootcd.org/usb-booting/
```