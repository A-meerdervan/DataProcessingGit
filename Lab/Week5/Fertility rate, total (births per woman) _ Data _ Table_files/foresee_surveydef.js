var $$FSR = {
  'enabled': true,
  'frames': false,
  'sessionreplay': true,
  'auto': true,
  'encode': true,
  'version': '18.1.9',
  'files': '/foresee/',
  // The 'swf_files' attribute needs to be set when foresee_transport.swf is not located at 'files'
  //'swf_files': '/some/other/location/'
  'id': 'xYpMVkA5xg9Bx5llpBsANQ==',
  'definition': 'foresee_surveydef.js',
  'swf': {
    'fileName': 'foresee_transport.swf',
    'scriptAccess': 'always'
  },
  'worker': 'foresee_worker.js',
  'embedded': false,
  'replay_id': 'worldbank.org',
  'site_id': 'worldbank.org',
  'attach': false,
  'renderer': 'W3C',
  // or "ASRECORDED"
  'layout': 'CENTERFIXED',
  // or "LEFTFIXED" or "LEFTSTRETCH" or "CENTERSTRETCH"
  'triggerDelay': 0,
  'heartbeat': true,
  'enableAMD': false,
  'pools': [{
    'path': '.',
    'sp': 100 // CHANGE ONLY WHEN INCLUDING SESSION REPLAY
  }],
  'sites': [{
    'path': /\w+-?\w+\.(com|org|edu|gov|net|co\.uk)/
  },
  {
    'path': '.',
    'domain': 'default'
  }],
  'storageOption': 'cookie',
  'nameBackup': window.name,
  'iframeHrefs': ["frameWorker.html"],
  'acceptableorigins': []
};

$$FSR.FSRCONFIG = {};

(function (config) {

  var FSR, supports_amd = !! config.enableAMD && typeof(_4c.global["define"]) === 'function' && !! _4c.global["define"]["amd"];

  if (!supports_amd) FSR = window.FSR;
  else FSR = {};
/*
 * ForeSee Survey Def(s)
 */

  FSR.surveydefs = [{
    name: 'tablet_spa',
    invite: {
      when: 'onentry',
      dialogs: [
        [{
          reverseButtons: false,
          headline: "¡Sus sugerencias son muy valiosas!",
          blurb: "Luego de su visita, ¿podemos enviarle una breve encuesta de satisfacción del cliente por correo electrónico para poder mejorar su experiencia con el sitio?",
          attribution: "Encuesta realizada por ForeSee.",
          declineButton: "No, gracias",
          acceptButton: "Sí, daré mis sugerencias",
          //locale : "spa"
        }],
        [{
          reverseButtons: false,
          headline: "¡Muchas gracias por ayudarnos!",
          blurb: "Indíque su dirección de correo electrónico. Luego de su visita, le enviaremos un enlace a la encuesta. <br /><br /><a href='//www.foresee.com/privacy-policy.shtml' target='_blank'>Política de privacidad</a> de ForeSee<br /><br />",
          attribution: "Encuesta realizada por ForeSee.",
          declineButton: "Cancelar",
          acceptButton: "enviarme un correo electrónico",
          //locale : "spa",
          mobileExitDialog: {
            support: "e",
            //e for email only, s for sms only, b for both
            inputMessage: "dirección de correo electrónico",
            emailMeButtonText: "enviarme un correo electrónico",
            //textMeButtonText : "text me",
            fieldRequiredErrorText: "Ingrese una dirección de correo electrónico",
            invalidFormatErrorText: "El formato debe ser: name@domain.com"
          }
        }]
      ],
      siteLogo: "sitelogo_spa.gif"
    },
    pop: {
      when: 'later'
    },
    criteria: {
      sp: 50,
      lf: 2
    },
    platform: 'tablet',
    include: {
      urls: ['bancomundial.org']
    }
  },
  {
    name: 'mobile_web_spa',
    invite: {
      when: 'onentry',
      dialogs: [
        [{
          reverseButtons: false,
          headline: "¡Sus sugerencias son muy valiosas!",
          blurb: "Luego de su visita, ¿podemos enviarle una breve encuesta de satisfacción del cliente por correo electrónico para poder mejorar su experiencia con el sitio?",
          attribution: "Encuesta realizada por ForeSee.",
          declineButton: "No, gracias",
          acceptButton: "Sí, daré mis sugerencias",
          //locale : "spa"
        }],
        [{
          reverseButtons: false,
          headline: "¡Muchas gracias por ayudarnos!",
          blurb: "Indíque su dirección de correo electrónico. Luego de su visita, le enviaremos un enlace a la encuesta. <br /><br /><a href='//www.foresee.com/privacy-policy.shtml' target='_blank'>Política de privacidad</a> de ForeSee<br /><br />",
          attribution: "Encuesta realizada por ForeSee.",
          declineButton: "Cancelar",
          acceptButton: "enviarme un correo electrónico",
          //locale : "spa",
          mobileExitDialog: {
            support: "e",
            //e for email only, s for sms only, b for both
            inputMessage: "dirección de correo electrónico",
            emailMeButtonText: "enviarme un correo electrónico",
            //textMeButtonText : "text me",
            fieldRequiredErrorText: "Ingrese una dirección de correo electrónico",
            invalidFormatErrorText: "El formato debe ser: name@domain.com"
          }
        }]
      ],
      siteLogo: "sitelogo_spa.gif"
    },
    pop: {
      when: 'later'
    },
    criteria: {
      sp: 50,
      lf: 2
    },
    platform: 'phone',
    include: {
      urls: ['bancomundial.org']
    }
  },
  {
    name: 'tablet_fre',
    invite: {
      when: 'onentry',
      dialogs: [
        [{
          reverseButtons: false,
          headline: "Faites-nous part de votre opinion!",
          blurb: "Pouvons-nous vous envoyer une brève enquête de satisfaction client pour nous permettre d’améliorer votre expérience sur notre site?",
          attribution: "Menée par ForeSee",
          declineButton: "Non merci",
          acceptButton: "Oui, je souhaite vous aider",
          //locale : "fre"
        }],
        [{
          reverseButtons: false,
          headline: "Nous vous remercions.",
          blurb: "Veuillez indiquer votre adresse e-mail. Après votre visite, nous vous enverrons un lien pour l'enquête. <br /><br /><a href='//www.foresee.com/privacy-policy.shtml' target='_blank'>Politique de confidentialité</a> de ForeSee<br /><br />",
          attribution: "Menée par ForeSee",
          declineButton: "Annuler",
          acceptButton: "Envoyez-moi un e-mail",
          //locale : "fre",
          mobileExitDialog: {
            support: "e",
            //e for email only, s for sms only, b for both
            inputMessage: "Adresse e-mail",
            emailMeButtonText: "Envoyez-moi un e-mail",
            //textMeButtonText : "text me",
            fieldRequiredErrorText: "Veuillez saisir une adresse e-mail",
            invalidFormatErrorText: "Le format doit être le suivant : nom@domaine.com"
          }
        }]
      ],
      siteLogo: "sitelogo_fre.gif"
    },
    pop: {
      when: 'later'
    },
    criteria: {
      sp: 100,
      lf: 2
    },
    platform: 'tablet',
    include: {
      urls: ['banquemondiale.org']
    }
  },
  {
    name: 'mobile_web_fre',
    invite: {
      when: 'onentry',
      dialogs: [
        [{
          reverseButtons: false,
          headline: "Faites-nous part de votre opinion!",
          blurb: "Pouvons-nous vous envoyer une brève enquête de satisfaction client pour nous permettre d’améliorer votre expérience sur notre site?",
          attribution: "Menée par ForeSee",
          declineButton: "Non merci",
          acceptButton: "Oui, je souhaite vous aider",
          //locale : "fre"
        }],
        [{
          reverseButtons: false,
          headline: "Nous vous remercions.",
          blurb: "Veuillez indiquer votre adresse e-mail. Après votre visite, nous vous enverrons un lien pour l'enquête. <br /><br /><a href='//www.foresee.com/privacy-policy.shtml' target='_blank'>Politique de confidentialité</a> de ForeSee<br /><br />",
          attribution: "Menée par ForeSee",
          declineButton: "Annuler",
          acceptButton: "Envoyez-moi un e-mail",
          //locale : "fre",
          mobileExitDialog: {
            support: "e",
            //e for email only, s for sms only, b for both
            inputMessage: "Adresse e-mail",
            emailMeButtonText: "Envoyez-moi un e-mail",
            //textMeButtonText : "text me",
            fieldRequiredErrorText: "Veuillez saisir une adresse e-mail",
            invalidFormatErrorText: "Le format doit être le suivant : nom@domaine.com"
          }
        }]
      ],
      siteLogo: "sitelogo_fre.gif"
    },
    pop: {
      when: 'later'
    },
    criteria: {
      sp: 100,
      lf: 2
    },
    platform: 'phone',
    include: {
      urls: ['banquemondiale.org']
    }
  },
  {
    name: 'tablet',
    invite: {
      when: 'onentry',
      dialogs: [
        [{
          reverseButtons: false,
          headline: "We'd welcome your feedback!",
          blurb: "Can we email you later a brief visitor satisfaction survey so we can improve your mobile experience?",
          attribution: "Conducted by ForeSee.",
          declineButton: "No, thanks",
          acceptButton: "Yes, I'll help",
          locale: "eng"
        }],
        [{
          reverseButtons: false,
          headline: "Thank you for helping!",
          blurb: "Please provide your email address. After your visit we'll send you a link to the survey. <br /><br />ForeSee's <a href='//www.foresee.com/privacy-policy.shtml' target='_blank'>Privacy Policy</a><br /><br />",
          attribution: "Conducted by ForeSee.",
          declineButton: "Cancel",
          acceptButton: "email me",
          locale: "eng",
          mobileExitDialog: {
            support: "e",
            //e for email only, s for sms only, b for both
            inputMessage: "email address",
            emailMeButtonText: "email me",
            //textMeButtonText : "text me",
            fieldRequiredErrorText: "Enter an email address",
            invalidFormatErrorText: "Format should be: name@domain.com"
          }
        }]
      ],
      siteLogo: "sitelogo_eng.gif"
    },
    pop: {
      when: 'later'
    },
    criteria: {
      sp: 20,
      lf: 2
    },
    platform: 'tablet',
    include: {
      urls: ['worldbank.org']
    }
  },
  {
    name: 'mobile_web',
    invite: {
      when: 'onentry',
      dialogs: [
        [{
          reverseButtons: false,
          headline: "We'd welcome your feedback!",
          blurb: "Can we email you later a brief visitor satisfaction survey so we can improve your mobile experience?",
          attribution: "Conducted by ForeSee.",
          declineButton: "No, thanks",
          acceptButton: "Yes, I'll help",
          locale: "eng"
        }],
        [{
          reverseButtons: false,
          headline: "Thank you for helping!",
          blurb: "Please provide your email address. After your visit we'll send you a link to the survey. <br /><br />ForeSee's <a href='//www.foresee.com/privacy-policy.shtml' target='_blank'>Privacy Policy</a><br /><br />",
          attribution: "Conducted by ForeSee.",
          declineButton: "Cancel",
          acceptButton: "email me",
          locale: "eng",
          mobileExitDialog: {
            support: "e",
            //e for email only, s for sms only, b for both
            inputMessage: "email address",
            emailMeButtonText: "email me",
            //textMeButtonText : "text me",
            fieldRequiredErrorText: "Enter an email address",
            invalidFormatErrorText: "Format should be: name@domain.com"
          }
        }]
      ],
      siteLogo: "sitelogo_eng.gif"
    },
    pop: {
      when: 'later'
    },
    criteria: {
      sp: 20,
      lf: 2
    },
    platform: 'phone',
    include: {
      urls: ['worldbank.org']
    }
  },
  {
    name: 'worldbank',
    platform: 'desktop',
    invite: {
      when: 'onentry'
    },
    pop: {
      when: 'now'
    },
    criteria: {
      sp: 2,
      lf: 4,
      locales: [{
        locale: 'fre',
        sp: 5,
        lf: 4
      },
      {
        locale: 'spa',
        sp: 5,
        lf: 4
      },
      {
        locale: 'ara',
        sp: 15,
        lf: 4
      }]
    },
    include: {
      urls: ['.']
    }
  }];

/*
 * ForeSee Properties
 */
  FSR.properties = {
    repeatdays: 90,

    repeatoverride: false,

    altcookie: {},

    language: {
      locale: 'eng',
      src: 'variable',
      type: 'client',
      name: 'WorldBank.lang',
      locales: [{
        match: 'en',
        locale: 'eng'
      },
      {
        match: 'es',
        locale: 'spa'
      },
      {
        match: 'spa',
        locale: 'spa'
      },
      {
        match: 'fr',
        locale: 'fre'
      },
      {
        match: 'fre',
        locale: 'fre'
      },
      {
        match: 'ar',
        locale: 'ara'
      },
      {
        match: 'ara',
        locale: 'ara'
      }]
    },

    exclude: {
      variables: [{
        name: 'strIP',
        value: [/^192\.168\.[0-9]{1,3}\.[0-9]{1,3}$/, /^172\.16\.[0-9]{1,3}\.[0-9]{1,3}$/, /^172\.16\.[0-9]{1,3}\.[0-9]{1,3}$/, /^172\.17\.[0-9]{1,3}\.[0-9]{1,3}$/, /^172\.18\.[0-9]{1,3}\.[0-9]{1,3}$/, /^172\.19\.[0-9]{1,3}\.[0-9]{1,3}$/, /^172\.20\.[0-9]{1,3}\.[0-9]{1,3}$/, /^172\.21\.[0-9]{1,3}\.[0-9]{1,3}$/, /^172\.22\.[0-9]{1,3}\.[0-9]{1,3}$/, /^172\.23\.[0-9]{1,3}\.[0-9]{1,3}$/, /^172\.24\.[0-9]{1,3}\.[0-9]{1,3}$/, /^172\.25\.[0-9]{1,3}\.[0-9]{1,3}$/, /^172\.26\.[0-9]{1,3}\.[0-9]{1,3}$/, /^172\.27\.[0-9]{1,3}\.[0-9]{1,3}$/, /^172\.28\.[0-9]{1,3}\.[0-9]{1,3}$/, /^172\.29\.[0-9]{1,3}\.[0-9]{1,3}$/, /^172\.30\.[0-9]{1,3}\.[0-9]{1,3}$/, /^172\.31\.[0-9]{1,3}\.[0-9]{1,3}$/]
      }]
    },

    ignoreWindowTopCheck: false,

    ipexclude: 'fsr$ip',

    mobileHeartbeat: {
      delay: 60,
      /*mobile on exit heartbeat delay seconds*/
      max: 3600 /*mobile on exit heartbeat max run time seconds*/
    },

    invite: {

      // For no site logo, comment this line:
      siteLogo: "sitelogo.gif",

      //alt text fore site logo img
      siteLogoAlt: "",

      /* Desktop */
      dialogs: [
        [{
          reverseButtons: false,
          headline: "We'd welcome your feedback!",
          //blurb: "Thank you for visiting our website. You have been selected to participate in a brief customer satisfaction survey to let us know how we can improve your experience.",
          blurb: "Thank you for visiting our website. You have been selected to participate in a brief customer satisfaction survey to let us know how we can improve your experience.<br><br>Please select your language and click \"Yes, I'll give feedback\".&nbsp;&nbsp;<SELECT NAME=\"language\" onchange=\"FSR._language(this.value)\"><OPTION name=\"locale\" value=\"eng\" SELECTED>English<OPTION name=\"locale\" value=\"fre\">en Fran&ccedil;ais<OPTION name=\"locale\" value=\"spa\">en Espa&ntilde;ol<OPTION name=\"locale\" value=\"ara\">العربية</SELECT><br><br>",
          //noticeAboutSurvey: "The survey is designed to measure your entire experience, please look for it at the <u>conclusion</u> of your visit.",
          attribution: "This survey is conducted by an independent company ForeSee, on behalf of the site you are visiting.",
          closeInviteButtonText: "Click to close.",
          declineButton: "No, thanks",
          acceptButton: "Yes, I'll give feedback",

          locales: {
            "spa": {
              headline: "¡Le agradeceríamos sus opiniones y comentarios!",
              blurb: "Le agrademos su visita a nuestro sitio web. Usted ha sido elegido(a) al azar para participar en una breve encuesta de satisfacción del cliente para informarnos acerca de cómo podemos mejorar su experiencia con nosotros.<br><br>Por favor seleccione su idioma y haga clic en \"Sí, deseo dar mi opinión\".&nbsp;&nbsp;<SELECT NAME=\"language\" onchange=\"FSR._language(this.value)\"><OPTION name=\"locale\" value=\"eng\">English<OPTION name=\"locale\" value=\"fre\">en Fran&ccedil;ais<OPTION name=\"locale\" value=\"spa\" SELECTED>en Espa&ntilde;ol<OPTION name=\"locale\" value=\"ara\">العربية</SELECT><br><br>",
              //noticeAboutSurvey: "La encuesta está diseñada para medir toda su experiencia con nosotros, sírvase buscarla al finalizar su visita.",
              attribution: "Esta encuesta se realiza a través de una empresa independiente, ForeSee, en nombre del sitio que usted está visitando.",
              closeInviteButtonText: "Haga clic para cerrar.",
              declineButton: "No, gracias",
              acceptButton: "Sí, deseo dar mi opinión"
            },
            "fre": {
              headline: "Vos commentaires sont les bienvenus!",
              blurb: "Merci de visiter notre site Web. Vous avez été sélectionné pour participer à un court sondage sur la satisfaction de la clientèle afin que nous puissions améliorer votre expérience.<br><br>Sélectionnez votre langue et cliquez sur \"Oui, j’ai des commentaires à faire\".&nbsp;&nbsp;<SELECT NAME=\"language\" onchange=\"FSR._language(this.value)\"><OPTION name=\"locale\" value=\"eng\">English<OPTION name=\"locale\" value=\"fre\" SELECTED>en Fran&ccedil;ais<OPTION name=\"locale\" value=\"spa\">en Español<OPTION name=\"locale\" value=\"ara\">العربية</SELECT><br><br>",
              //noticeAboutSurvey: "Ce sondage est conçu pour mesurer votre expérience dans son ensemble. Vous le trouverez à la <u>fin</u> de votre visite.",
              attribution: "Ce sondage est mené par ForeSee, une entreprise indépendante, pour le compte du site que vous visitez.",
              closeInviteButtonText: "Cliquer pour fermer.",
              declineButton: "Non merci",
              acceptButton: "Oui, j’ai des commentaires à faire"
            },
            "ara": {
              reverseButtons: false,
              headline: "نرحب بآرائك وملاحظاتك",
              blurb: "شكرًا لك على زيارتك لموقعنا الإلكتروني. لقد تم اختيارك للمشاركة في استقصاء مختصر لرضا العميل حتى يتسنى لنا معرفة الطريقة التي يمكننا بها تحسين خبرة استخدامك للموقع<br><br>سيظهر الاستقصاء الخاص بك بعد انتهائك من زيارة الموقع الإلكتروني \"نعم، أرغب في المشاركة\"&nbsp;&nbsp;<SELECT NAME=\"language\" onchange=\"FSR._language(this.value)\"><OPTION name=\"locale\" value=\"ara\" SELECTED>العربية<OPTION name=\"locale\" value=\"eng\" >English<OPTION name=\"locale\" value=\"fre\">en Fran&ccedil;ais<OPTION name=\"locale\" value=\"spa\">en Espa&ntilde;ol</SELECT><br>",
              //noticeAboutSurvey: "The survey is designed to measure your entire experience, please look for it at the <u>conclusion</u> of your visit.",
              attribution: "ويقوم بإجراء هذا الاستقصاء شركة مستقلة هي ForeSee، وذلك بالنيابة عن الموقع الذي تقوم بزيارته",
              closeInviteButtonText: "انقر للإغلاق",
              declineButton: "لا، شكرًا",
              acceptButton: "نعم، سأقدم ملاحظاتي"
            }
          }
        }]
      ],

      exclude: {
        urls: [],
        referrers: [],
        userAgents: [],
        browsers: [],
        cookies: [],
        variables: []
      },
      include: {
        local: ['.']
      },

      delay: 0,
      timeout: 0,

      hideOnClick: false,

      hideCloseButton: false,

      css: 'foresee_dhtml.css',

      hide: [],

      hideFlash: false,

      type: 'dhtml',
      /* desktop */
      // url: 'invite.html'
      /* mobile */
      url: 'invite-mobile.html',
      back: 'url'

      //SurveyMutex: 'SurveyMutex'
    },

    tracker: {
      width: '690',
      height: '415',

      // Timeout is the normal between-page timeout
      timeout: 10,

      // Fast timeout is when we think there's a good chance we've closed the browser
      fasttimeout: 4,

      adjust: true,
      alert: {
        enabled: true,
        message: 'The survey is now available.'
      },
      url: 'tracker.html'
    },

    survey: {
      width: 690,
      height: 600
    },

    qualifier: {
      footer: '<div id=\"fsrcontainer\"><div style=\"float:left;width:80%;font-size:8pt;text-align:left;line-height:12px;\">This survey is conducted by an independent company ForeSee,<br>on behalf of the site you are visiting.</div><div style=\"float:right;font-size:8pt;\"><a target="_blank" title="Validate TRUSTe privacy certification" href="//privacy-policy.truste.com/click-with-confidence/ctv/en/www.foreseeresults.com/seal_m"><img border=\"0\" src=\"{%baseHref%}truste.png\" alt=\"Validate TRUSTe Privacy Certification\"></a></div></div>',
      width: '690',
      height: '500',
      bgcolor: '#333',
      opacity: 0.7,
      x: 'center',
      y: 'center',
      delay: 0,
      buttons: {
        accept: 'Continue'
      },
      hideOnClick: false,
      css: 'foresee_dhtml.css',
      url: 'qualifying.html'
    },

    cancel: {
      url: 'cancel.html',
      width: '690',
      height: '400'
    },

    pop: {
      what: 'survey',
      after: 'leaving-site',
      pu: false,
      tracker: true
    },

    meta: {
      referrer: true,
      terms: true,
      ref_url: true,
      url: true,
      url_params: false,
      user_agent: false,
      entry: false,
      entry_params: false
    },

    events: {
      enabled: true,
      id: true,
      codes: {
        purchase: 800,
        items: 801,
        dollars: 802,
        followup: 803,
        information: 804,
        content: 805
      },
      pd: 7,
      custom: {}
    },

    previous: false,

    analytics: {
      google_local: false,
      google_remote: false
    },

    cpps: {
      "S_channel variable:": { //this will be the name of the cpp
        source: 'variable',
        name: 's_channel' //the value sent will be the value of the parameter
      },
      "S_channel variable:": {
        source: 'variable',
        name: 's.channel'
      },
      "s.prop26": {
        source: 'variable',
        name: 's.prop26'
      }
    },

    mode: 'first-party'
  };

  if (supports_amd) {
    define(function () {
      return FSR
    });
  }

})($$FSR);