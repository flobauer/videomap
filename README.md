# Video Map Sync Application

This application allows you to sync a youtube video to a open street map.

# add a new video map page
To visit a detailed page you need to go to `/fahrt/<id>` page
-> the id is the ID of the youtube video
-> you need to put a `<id>.gpx` into the `public/api/` folder with the tracking info

The GPX file must contain this information:
- title of Drive
- Mapping of VideoTime to GPS Time
- tracking points

Sample format:
```xml
<?xml version='1.0' encoding='UTF-8' standalone='yes' ?>
<gpx version="1.1">
  <metadata>
    <overalltitle>
      Erster Versuch
    </overalltitle>
    <mapping>
      <videoTime>200</videoTime>
      <gpsTime>1563106298</gpsTime>
    </mapping>
  </metadata>
  <trkpt lat="47.260609" lon="10.379791">
    <ele>1078.7</ele>
    <time>2019-07-14T12:11:02.000Z</time>
    <extensions>
      <geotracker:meta c="218.37" s="0" />
    </extensions>
  </trkpt>
  <trkpt lat="47.26062" lon="10.379845">
    <ele>1078.2</ele>
    <time>2019-07-14T12:11:37.000Z</time>
    <extensions>
      <geotracker:meta c="38.12" s="0.73" />
    </extensions>
  </trkpt>
</gpx>
```

## Important

- title is always `overalltitle`, where it is placed doesn't matter
- mapping is always `videoTime` and `gpsTime`, where it is placed doesn't matter
- title is always `overalltitle`, where it is placed doesn't matter
- a tracking point always is `trkpt`, where it is placed doesn't matter