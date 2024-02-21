import { gsap } from "gsap";

// Cardinal spline - a uniform Catmull-Rom spline with a tension option
function cardinal(data, closed, tension = 1) {

  if (data.length < 1) return "M0 0";
  // if (tension == null) tension = 1;
  // eslint-disable-next-line no-param-reassign
  tension = tension ?? 1

  const size = data.length - (closed ? 0 : 1);
  let path = `M${  data[0].x  } ${  data[0].y  } C`;

  for (let i = 0; i < size; i++) {

    let p0; let p1; let p2; let p3;

    if (closed) {
      p0 = data[(i - 1 + size) % size];
      p1 = data[i];
      p2 = data[(i + 1) % size];
      p3 = data[(i + 2) % size];

    } else {
      p0 = i === 0 ? data[0] : data[i - 1];
      p1 = data[i];
      p2 = data[i + 1];
      p3 = i === size - 1 ? p2 : data[i + 2];
    }

    const x1 = p1.x + (p2.x - p0.x) / 6 * tension;
    const y1 = p1.y + (p2.y - p0.y) / 6 * tension;

    const x2 = p2.x - (p3.x - p1.x) / 6 * tension;
    const y2 = p2.y - (p3.y - p1.y) / 6 * tension;

    path += ` ${  x1  } ${  y1  } ${  x2  } ${  y2  } ${  p2.x  } ${  p2.y}`;
  }

  return closed ? `${path  }z` : path;
}

function createBlob(options) {
  options.pause = true;

  const points = [];

  const path = options.element.isArray || options.element instanceof NodeList ? [...options.element] : [options.element];
  const slice = (Math.PI * 2) / options.numPoints;
  const startAngle = gsap.utils.random(0, 360);

  const tl = gsap.timeline({
    onUpdate: () => {
      // eslint-disable-next-line no-unused-expressions
      !options.pause && path.forEach(el => el.setAttribute("d", cardinal(points, true, 1)))
    }
  });

  for (let i = 0; i < options.numPoints; i++) {

    const angle = startAngle + i * slice;
    const duration = gsap.utils.random(options.minDuration, options.maxDuration);

    const point = {
      x: options.centerX + Math.cos(angle) * options.minRadius,
      y: options.centerY + Math.sin(angle) * options.minRadius
    };

    const tween = gsap.to(point, {
      duration,
      x: options.centerX + Math.cos(angle) * options.maxRadius,
      y: options.centerY + Math.sin(angle) * options.maxRadius,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    tl.add(tween, -gsap.utils.random(0, duration));
    points.push(point);
  }

  options.tl = tl;
  options.points = points;

  return options;
}

const waveObserver = (el, callback) => {
  const intersectionObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        callback(entry.isIntersecting)
      });
    },
    {
      rootMargin: "0px",
    }
  );

  intersectionObserver.observe(el);
}

const waveCards = document.querySelectorAll('.js-wave-card')
waveCards.forEach(el => {
  const blob1 = createBlob({
    element: el.querySelectorAll("#path1"),
    numPoints: 20,
    centerX: -50,
    centerY: 350,
    minRadius: 250,
    maxRadius: 280,
    minDuration: 4,
    maxDuration: 6
  });

  const blob2 = createBlob({
    element: el.querySelectorAll("#path2"),
    numPoints: 10,
    centerX: -50,
    centerY: 300,
    minRadius: 180,
    maxRadius: 225,
    minDuration: 3.5,
    maxDuration: 5.5
  });

  const blob3 = createBlob({
    element: el.querySelectorAll("#path3"),
    numPoints: 10,
    centerX: 0,
    centerY: 300,
    minRadius: 150,
    maxRadius: 250,
    minDuration: 6,
    maxDuration: 9.5
  });

  waveObserver(el, (isIntersecting) => {
    blob1.pause = !isIntersecting
    blob2.pause = !isIntersecting
    blob3.pause = !isIntersecting
  })
})

const waveSystemSection = document.querySelectorAll('.section-system-for__waves')
waveSystemSection.forEach(el => {
  const blobSystem1 = createBlob({
    element: el.querySelectorAll("#path-system-1"),
    numPoints: 20,
    centerX: -200,
    centerY: 200,
    minRadius: 300,
    maxRadius: 335,
    minDuration: 4,
    maxDuration: 6
  });

  const blobSystem2 = createBlob({
    element: el.querySelectorAll("#path-system-2"),
    numPoints: 10,
    centerX: -100,
    centerY: 150,
    minRadius: 180,
    maxRadius: 225,
    minDuration: 3.5,
    maxDuration: 5.5
  });

  const blobSystem3 = createBlob({
    element: el.querySelectorAll("#path-system-3"),
    numPoints: 10,
    centerX: -50,
    centerY: 250,
    minRadius: 150,
    maxRadius: 250,
    minDuration: 6,
    maxDuration: 9.5
  });

  waveObserver(el, (isIntersecting) => {
    blobSystem1.pause = !isIntersecting
    blobSystem2.pause = !isIntersecting
    blobSystem3.pause = !isIntersecting
  })
})

const priceSection = document.querySelector('.section-price__list')
const priceWaves = [];
if (priceSection) {
  const priceCards = document.querySelectorAll('.price-card-wave')
  priceCards.forEach((el, index) => {
    if (window.innerWidth < 599) return;

    priceWaves.push(createBlob({
      element: el,
      numPoints: 10,
      centerX: 0,
      centerY: 0,
      minRadius: 85 + Math.floor(Math.random() * 85) + index * Math.floor(Math.random() * 3),
      maxRadius: 100 + Math.floor(Math.random() * 150) + index * Math.floor(Math.random() * 3),
      minDuration: 6,
      maxDuration: 11.5
    }))
  })

  waveObserver(priceSection, (isIntersecting) => {
    priceWaves.forEach(el => {
      el.pause = !isIntersecting
    })
  })
}

const formSection = document.querySelector('.section-faq__form-wave')
const formWaves = [];

if (formSection) {
  const form = formSection.querySelectorAll('.form-wave')

  form.forEach((el, index) => {
    formWaves.push(createBlob({
      element: el,
      numPoints: 10,
      centerX: 0,
      centerY: 0,
      minRadius: 250 + Math.floor(Math.random() * 85) + index * Math.floor(Math.random() * 3),
      maxRadius: 300 + Math.floor(Math.random() * 150) + index * Math.floor(Math.random() * 3),
      minDuration: 6,
      maxDuration: 11.5
    }))
  })

  waveObserver(formSection, (isIntersecting) => {
    formWaves.forEach(el => {
      el.pause = !isIntersecting
    })
  })
}

const wavePlans = document.querySelectorAll('.js-wave-plans')
wavePlans.forEach(el => {
  const blob1 = createBlob({
    element: el.querySelectorAll("#path1"),
    numPoints: 5,
    centerX: 100,
    centerY: 400,
    minRadius: 200,
    maxRadius: 280,
    minDuration: 4,
    maxDuration: 6
  });

  const blob2 = createBlob({
    element: el.querySelectorAll("#path2"),
    numPoints: 10,
    centerX: -150,
    centerY: 300,
    minRadius: 180,
    maxRadius: 250,
    minDuration: 3.5,
    maxDuration: 5.5
  });

  const blob3 = createBlob({
    element: el.querySelectorAll("#path3"),
    numPoints: 10,
    centerX: 100,
    centerY: 250,
    minRadius: 220,
    maxRadius: 300,
    minDuration: 6,
    maxDuration: 9.5
  });

  waveObserver(el, (isIntersecting) => {
    blob1.pause = !isIntersecting
    blob2.pause = !isIntersecting
    blob3.pause = !isIntersecting
  })
})
