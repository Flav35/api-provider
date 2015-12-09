# API provider

## GeoIP API
Provide informations about IP/Host.
Return data into JSON format.
### /api/geoip/:ipOrHost
Provide all informations about IP/Host
*Response :*
'''
{
  country:{
    code
    name
  },
  city:{
    name1,
    name2,
    postal,
    latitude,
    longitude,
  },
  as
}
'''

### /api/geoip/country/:ipOrHost
Provide IP/Host's country informations
*Response :*
'''
{
  code,
  name
}
'''

### /api/geoip/city/:ipOrHost
Provide IP/Host's city informations
*Response :*
'''
{
  name1,
  name2,
  postal,
  latitude,
  longitude
}
'''

### /api/geoip/as/:ipOrHost
Provide IP/Host's city informations
*Response :*
'''
{
  as
}
'''

### /api/geoip/location/:ipOrHost
Provide IP/Host's city informations
*Response :*
'''
{
  latitude,
  longitude
}
'''
