//
// Juxtapose init
//

// Default

if (document.getElementById('peaIslandPhotos')) {

  // slider = new juxtapose.JXSlider('#peaIslandPhotos');

  slider = new juxtapose.JXSlider('#peaIslandPhotos',
    [
      {
        src: '../../assets/images/pea-island-before@1x.jpg',
        label: 'Before',
        credit: ''
      },
      {
        src: '../../assets/images/pea-island-after@1x.jpg',
        label: 'After',
        credit: ''
      }
    ],
    {
      animate: true,
      showLabels: true,
      showCredits: false,
      startingPosition: "50%",
      makeResponsive: true
    }
  );

}


if (document.getElementById('rodanthePhotos')) {

  // slider = new juxtapose.JXSlider('#rodanthePhotos');

  slider = new juxtapose.JXSlider('#rodanthePhotos',
    [
      {
        src: '../../assets/images/rodanthe-before@1x.jpg',
        label: 'Before',
        credit: ''
      },
      {
        src: '../../assets/images/rodanthe-after@1x.jpg',
        label: 'After',
        credit: ''
      }
    ],
    {
      animate: true,
      showLabels: true,
      showCredits: false,
      startingPosition: "50%",
      makeResponsive: true
    }
  );

}


// Vertical (note "mode" option)
//
// slider = new juxtapose.JXSlider('#peaIslandPhotosVertical',
//   [
//     {
//       src: '../../assets/images/pea-island-before@1x.jpg',
//       label: 'Before',
//       credit: ''
//     },
//     {
//       src: '../../assets/images/pea-island-after@1x.jpg',
//       label: 'After',
//       credit: ''
//     }
//   ],
//   {
//     animate: true,
//     showLabels: true,
//     showCredits: false,
//     startingPosition: "50%",
//     makeResponsive: true,
//     mode: "vertical"
//   }
// );
