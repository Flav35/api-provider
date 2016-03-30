# API provider

## GeoIP API
Provide informations about IP.
Return data into JSON format.
### /geoip/:ip
Provide all informations about IP

*Response :*
```
{
  range:[min,max],
  country,
  region,
  city,
  ll: [latitude,longitude],
  metro
}
```

### /geoip/country/:ip
Provide IP's country informations

*Response :*
```
{
  name
}
```

### /geoip/city/:ip
Provide IP's city informations

*Response :*
```
{
  name
}
```

### /geoip/location/:ip
Provide IP's city informations

*Response :*
```
{
  location:[latitude, longitude]
}
```
