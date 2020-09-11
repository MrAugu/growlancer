<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {
  }
}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: sofia-pro, sans-serif;
    font-style: normal;
    font-weight: 100;
    background-color: #16151d!important;
    color: #ffffff;
  }

  a {
    color: #446fff;
    text-decoration: none;
  }

  a:hover {
    color: #1441d4;
    text-decoration: none;
  }

  textarea:focus,
  input:focus {
    outline: none;
  }

  p {
    font-size: .9em;
    line-height: 1.6em;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  .page-loader {
    text-align: center;
  }

  .page-loader .ball-pulse div {
    width: 10px;
    height: 10px;
  }

  .gscni-btn {
    position: relative!important;
    left: 0em!important;
    width: 100%!important;
    margin-top: 5px;
  }

  .button-primary {
    color: #fff;
    text-decoration: none;
    border: 1px solid #446fff;
    padding: 10px;
    border-radius: 3px;
    position: relative;
    top: -1.8em;
    left: 2em;
    transition: 0.5s;
  }

  .button-primary:hover {
    border: 1px solid #ffffff;
    background-color: #ffffff;
    color: #446fff;
    transition: 0.5s;
  }

  .button-green {
    color: #fff;
    text-decoration: none;
    border: 1px solid #28a745;
    padding: 10px;
    border-radius: 3px;
    position: relative;
    top: -1.8em;
    left: 2em;
    transition: 0.5s;
  }

  .button-green:hover {
    border: 1px solid #ffffff;
    background-color: #ffffff;
    color: #28a745;
    transition: 0.5s;
  }

  .button-disabled {
    color: #fff;
    text-decoration: none;
    border: 1px solid #dc3545;
    padding: 10px;
    border-radius: 3px;
    position: relative;
    top: -1.8em;
    left: 2em;
    transition: 0.5s;
  }

  .button-disabled:hover {
    border: 1px solid #ffffff;
    background-color: #ffffff;
    color: #dc3545;
    transition: 0.5s;
  }

  .head-title {
    text-align: center;
    margin-top: 2em;
    margin-bottom: 2em;
  }

  .head-title-underline {
    text-align: center;
    margin-top: 2em;
  }

  .head-title-under-line-child {
    text-align: center;
    position: relative;
    top: 0.3em;
    margin-bottom: 3em;
  }

  .form-field-text-input {
    width: 100%;
    height: 40px;
    background-color: rgba(0,0,0,0.1);
    height: 3em!important;
    padding: 0.50em 0.60em;
    color: #ffffff;
    border: solid 1px #3b3b3d;
    border-radius: 3px;
  }

  .form-field-text-input:focus {
    border-color: #446fff;
  }

  .form-field-title-description {
    margin-bottom: 10px;
    font-size: 15px;
    color: lightslategray;
  }

  .form-field-textarea {
    max-width: 100%;
    min-width: 100%;
    max-height: 120px;
    min-height: 120px;
    width: 100%;
    height: 120px;
    background-color: rgba(0, 0, 0, 0.1);
    border: 1px solid #49474d;
    border-radius: 3px;
    color: #ffffff;
    padding: 0.50em 0.60em;
  }

  .form-field-textarea:focus {
    border-color: #446fff;
  }

  .select2-container--default .select2-selection--multiple .select2-selection__rendered {
    background-color: #16151d;
  }

  .select2-container--default .select2-selection--multiple {
    background-color: #16151d!important;
    color: #fff!important;
    border: 1px solid #49474d!important;
  }

  .select2-results {
    background-color: rgba(0, 0, 0, 0.5)!important;
  }

  .select2-selection__choice {
    background: #16151d!important;
    border: 1px solid #49474d!important;
    border-radius: 3px!important;
  }

  .select2-search__field {
    color: #ffffff!important;
  }

  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }

    .form {
    margin: 2em;
  }

  .form-field {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  }

  .form-field-title {
    font-size: 18px;
  }

  .switch .checkbox {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
  }

  .checkbox:checked+.slider {
    background-color: #446fff;
  }

  .checkbox:focus+.slider {
    box-shadow: 0 0 1px #446fff;
  }

  .checkbox:checked+.slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }

  .switch-label {
    position: relative;
    left: 0.3em;
    top: 0.3em;
    font-weight: bold;
  }

  .alert {
    padding: 20px;
    background-color: #f44336;
    color: white;
    margin-bottom: 15px;
  }

  .closebtn {
    margin-left: 15px;
    color: white;
    font-weight: bold;
    float: right;
    font-size: 22px;
    line-height: 20px;
    cursor: pointer;
    transition: 0.3s;
  }

  .closebtn:hover {
    color: bla
  }

  #alerts {
    text-align: center;
    margin-right: 2em;
    margin-left: 2em;
  }

  .form-button {
    cursor: pointer;
    color: #fff;
    text-decoration: none;
    border: 1px solid #446fff;
    padding: 7px;
    border-radius: 3px;
    position: relative;
    transition: 0.5s;
    height: 40px;
    text-align: center;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  }

  .form-button:hover {
    border: 1px solid #ffffff;
    background-color: #ffffff;
    color: #446fff;
    transition: 0.5s;
  }

  .margin-left-btn {
    margin-left: 0.4em;
  }

  .green-alert {
    padding: 20px;
    background-color: #28a745;
    color: white;
    margin-bottom: 15px;
  }

  .home-center {
    text-align: center;
  }

  .bot-display-big-icon {
    border-radius: 50%;
    padding: 7px;
    margin-bottom: 2em;
    height: 13em;
  }

  @media only screen and (max-width: 990px) {
    .command-col .command-details {
      filter: none;
    }
  }

  .basic-select {
    background-color: #16151d;
    position: relative;
    color: #ffffff;
    border: solid 1px #49474d;
    border-radius: 3px;
  }

  .basic-select:hover {
    border-color: #446fff;
  }

  .basic-select select {
    display: none;
  }

  .select-selected {
    background-color: rgba(0, 0, 0, 0.1);
  }

  .select-selected:after {
    position: absolute;
    content: "";
    top: 17px;
    right: 10px;
    width: 0;
    height: 0;
    border: 6px solid transparent;
    border-color: #fff transparent transparent transparent;
  }

  .select-selected.select-arrow-active:after {
    border-color: transparent transparent #fff transparent;
    top: 7px;
  }

  .select-items div,.select-selected {
    color: #ffffff;
    padding: 10px;
    font-size: 13px;
    border-color: transparent transparent rgba(0, 0, 0, 0.1) transparent;
    cursor: pointer;
    z-index: 100;
    height: 38px;
  }

  .select-items {
    position: absolute;
    background-color: rgba(17, 16, 23);
    top: 100%;
    left: 0;
    right: 0;
    z-index: 99;
  }

  .select-hide {
    display: none;
  }

  .select-items div:hover, .same-as-selected {
    background-color: #292929;
  }

  .modal {
    transition: 0.5;
    display: none;
    position: fixed;
    z-index: 999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(17, 16, 23, 0.6);
  }

  .modal-content {
    background-color: rgba(17, 16, 23);;
    margin: 5% auto;
    padding: 20px;
    border: 1px solid #446fff;
    border-radius: 5px;
    width: 75%;
    height: auto;
  }

  .close {
    color: #ccc;
    float: right;
    font-size: 28px;
    font-weight: bold;
    position: relative;
    top: -0.3em;
    right: 0.3em;
  }

  .close:hover, .close:focus {
    color: #ffffff;
    text-decoration: none;
    cursor: pointer;
  }

  .duration-number-input {
    float: left;
    width: 60%;
  }

  .duration-input-type {
    float: right;
    width: 39%;
  }

  #modalOpener {
    margin-left: 10%;
    margin-right: 10%;
    margin-bottom: 2.5em;
  }

  .option-list {
    margin-left: 2em;
    margin-right: 2em;
    font-size: 14px;
    margin-bottom: 3.4em;
  }

  .option-list-item {
    height: auto;
    width: auto;
    background-color: rgba(0, 0, 0, 0.3);
    padding: 1em;
    border-radius: 5px;
    margin-top: 2em;
    padding-top: 1.5em;
  }

  .description {
    color: #969494;
    font-size: 14px;
    width: 100%;
    height: auto;
    word-break: break-word;
    background-color: rgba(0,0,0,0.1);
    border-radius: 3px;
    padding-bottom: 5px;
    padding-left: 5px;
    padding-right: 5px;
  }

  .empty-message {
    margin: 2.3em;
    text-align: center;
  }

  .little-margin {
    margin-bottom: 2.4em!important;
  }

  .basic-btn-red {
    border: 6px solid #d9534f;
    background-color: #d9534f;
    border-radius: 50%;
    color: rgba(0, 0, 0, 0.5);
    font-size: 20px;
    margin-right: 0.3em;
  }

  .basic-btn-red:hover {
    color: rgba(0, 0, 0, 0.6);
    transition: 0.5s;
  }

  .red-trashbin {
    position: relative;
    left: 3px;
    top: 3px;
  }

  .btn-icon {
    color: #fff;
    text-decoration: none;
    border: 1px solid #dc3545;
    padding: 9px;
    margin-right: 5px;
    border-radius: 3px;
    transition: 0.5s;
    position: relative;
    top: 3px;
  }

  .btn-icon:hover {
    border: 1px solid #ffffff;
    background-color: #ffffff;
    color: #dc3545;
    transition: 0.5s;
  }

  .confirmation {
    z-index: 2000;
    min-width: 85%;
    margin-right: 10%;
    margin-left: 7.5%;
    max-width: 1200px;
    border-radius: 3px;
    background-color: rgba(0,0,0,0.7);
    padding: 15px;
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -moz-box-orient: horizontal;
    -o-box-orient: horizontal;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-align: center;
    -moz-box-align: center;
    -o-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    position: fixed;
    bottom: 20px;
    animation: confirmShake .3s linear;
  }

  @keyframes confirmShake 
  {
    from {-webkit-transform: translate(0,100px);}
    60% {-webkit-transform: translate(0,-15px);}
    80% {-webkit-transform: translate(0,5px);}
    95% {-webkit-transform: translate(0px,-5px);}
    to {-webkit-transform: translate(0,0px);}
  }

  @-webkit-keyframes confirmShake 
  {
    from {-webkit-transform: translate(0,100px);}
    60% {-webkit-transform: translate(0,-15px);}
    80% {-webkit-transform: translate(0,5px);}
    95% {-webkit-transform: translate(0px,-5px);}
    to {-webkit-transform: translate(0,0px);}
  }

  @media (max-width: 665px) {
    .confirmation {
      width: unset;
      -webkit-box-orient: vertical;
      -moz-box-orient: vertical;
      -o-box-orient: vertical;
      -webkit-flex-direction: column;
      -ms-flex-direction: column;
      flex-direction: column;
    }
  }

  .confirmation .confirmation-red {
    background-color: #f04747;
    -webkit-transition: background-color 400ms ease-out;
    -moz-transition: background-color 400ms ease-out;
    -o-transition: background-color 400ms ease-out;
    -ms-transition: background-color 400ms ease-out;
    transition: background-color 400ms ease-out;
  }

  .confirmation .confirmation-enter {
    bottom: -100px;
  }

  .confirmation .confirmation-enter .confirmation-enter-active {
    bottom: 20px;
  }

  .confirmation-leave {
    bottom: 20px;
  }

  .confirmation .confirmation-leave .confirmation-leave-active {
    bottom: -100px;
  }

  .confirmation .confirmation-text {
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    -o-box-flex: 1;
    box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    margin-right: auto;
    display: flex;
  }

  @media (max-width: 640px) {
    .confirmation .confirmation-text {
      margin: auto;
    }
  }

  .confirmation .confirmation-buttons {
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -moz-box-orient: horizontal;
    -o-box-orient: horizontal;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    margin-left: auto;
  }

  @media (max-width: 665px) {
    .confirmation .confirmation-buttons {
      margin: auto;
      margin-top: 5px;
    }
  }

  .confirmation .confirmation-buttons a {
    padding: 5px;
    margin-left: 10px;
  }

  .confirmation-primary {
    color: #fff;
    text-decoration: none;
    border: 1px solid #446fff;
    padding: 10px;
    border-radius: 3px;
    transition: 0.5s;
  }

  .no-hover {
    cursor: unset!important;
  }

  .no-hover:hover {
    border: 1px solid #446fff!important;
    background-color: transparent!important;
    color: #ffffff!important;
    transition: 0.5s!important;
  }

  .confirmation-primary:hover {
    border: 1px solid #ffffff;
    background-color: #ffffff;
    color: #446fff;
    transition: 0.5s;
  }

  .confirmation-discard {
    color: #fff;
    text-decoration: none;
    border: 1px solid #dc3545;
    padding: 10px;
    border-radius: 3px;
    transition: 0.5s;
  }

  .confirmation-discard:hover {
    border: 1px solid #ffffff;
    background-color: #ffffff;
    color: #dc3545;
    transition: 0.5s;
  }

  .subtle-head-link {
    color: #7289DA;
    text-decoration: none;
    cursor: pointer;
    transition: .5s;
  }

  .subtle-head-link:hover {
    opacity: 0.65;
  }

  .spacer {
    min-width: 100%;
    height: 2em;
  }

  @supports (-moz-appearance:none) {
    .gscni-btn {
      position: relative!important;
      top: 0em;
    }
  }

  .c-name {
    top: 3px;
    position: relative;
  }

  .code {
    padding-left: 2px;
    padding-right: 2px;
    border-radius: 2px;
    color: #e83e8c;
    background-color: #ffffff;
  }

  @-webkit-keyframes scale {
    0% {
      -webkit-transform: scale(1);
      transform: scale(1);
      opacity: 1;
    }
    45% {
      -webkit-transform: scale(0.1);
      transform: scale(0.1);
      opacity: 0.7;
    }
    80% {
      -webkit-transform: scale(1);
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes scale {
    0% {
      -webkit-transform: scale(1);
      transform: scale(1);
      opacity: 1;
    }
    45% {
      -webkit-transform: scale(0.1);
      transform: scale(0.1);
      opacity: 0.7;
    }
    80% {
      -webkit-transform: scale(1);
      transform: scale(1);
      opacity: 1; 
    }
  }

  .ball-pulse > div:nth-child(1) {
    -webkit-animation: scale 0.75s -0.24s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
    animation: scale 0.75s -0.24s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
  }

  .ball-pulse > div:nth-child(2) {
    -webkit-animation: scale 0.75s -0.12s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
    animation: scale 0.75s -0.12s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
  }

  .ball-pulse > div:nth-child(3) {
    -webkit-animation: scale 0.75s 0s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
    animation: scale 0.75s 0s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
  }

  .ball-pulse > div {
    background-color: #fff;
    width: 10px;
    height: 10px;
    border-radius: 100%;
    margin: 2px;
    position: relative;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    display: inline-block;
  }

  .add-role {
    position: relative;
    top: 1.4em;
  }

  .remove-role {
    position: relative;
    top: 1.4em;
  }

  .cmd-channel {
  margin-top: 0.3em;
  }

  .select2-container {
    width: 52.5%!important;
  }

  .select2-container--default .select2-results__option--highlighted[aria-selected] {
    background-color: #292929!important;
  }

  .select2-container--default .select2-selection--multiple {
    min-height: 2.45em!important;
  }

  .select2-results__option[aria-selected] {
    background-color: #13121a!important;
  }

  .select2-dropdown {
    border: none!important;
  }

  .select2-container--default .select2-selection--multiple {
    width: 189.5%!important;
  }

  .new-label {
    color: #fff;
    background-color: #d9534f;
    font-size: 8px;
    padding: 0 5px;
    padding-bottom: 2px;
    padding-left: 5px;
    border-radius: 25px;
    position: relative;
    top: -1em;
  }

  /* .pulse-blurple {
    animation: pulse-blurple-animation 2s infinite;
  }

  @keyframes pulse-blurple-animation {
    0% {
      box-shadow: 0 0 0 0px rgba(114, 137, 218, 0.2);
    }
    50% {
      box-shadow: 0 0 0 20px rgba(114, 137, 218, 0.5);
    }
    100% {
      box-shadow: 0 0 0 0px rgba(114, 137, 218, 0.2);
    }
  } */

  .guildCount {
    font-weight: bold;
    font-size: 1.5em;
  }

  .feature-container {
    text-align: center;
    display: flex;
    align-items: center;
    align-content: center;
    flex-direction: column;
    transition: 0.5s;
  }

  .tier-wrapper {
    text-align: center;
    display: flex;
    align-items: center;
    align-content: center;
    flex-direction: column;
    transition: 0.5s;
  }

  .service-wrapper {
    text-align: center;
    display: flex;
    align-items: center;
    align-content: center;
    flex-direction: column;
    transition: 0.5s;
  }

  .tier-card {
    position: relative;
    overflow: hidden;
    height: 683px;
    padding: 0.8em;
    width: 20em;
    text-align: left;
    background-color: #26212c;
    height: auto;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 1em;
    word-break: break-word!important;
    transition: 0.5s;
    -webkit-box-shadow: 10px 10px 16px -5px rgba(0, 0, 0, 0.46);
    -moz-box-shadow: 10px 10px 16px -5px rgba(0, 0, 0, 0.46);
    box-shadow: 10px 10px 16px -5px rgba(0, 0, 0, 0.46);
    transform: translateY(150px);
    opacity: 0;
    animation: come-in 0.6s ease forwards;
  }

  .service-card {
    position: relative;
    overflow: hidden;
    padding: 1em 1em 0 1em;
    width: 375px;
    background-color: #26212c;
    height: 500px;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1em;
    word-break: break-word!important;
    transition: 0.5s;
    -webkit-box-shadow: 10px 10px 16px -5px rgba(0, 0, 0, 0.46);
    -moz-box-shadow: 10px 10px 16px -5px rgba(0, 0, 0, 0.46);
    box-shadow: 10px 10px 16px -5px rgba(0, 0, 0, 0.46);
    transform: translateY(150px);
    opacity: 0;
    animation: come-in 0.6s ease forwards;
  }

  .feature-card {
    position: relative;
    overflow: hidden;
    padding: 1em 1em 0 1em;
    width: 24em;
    background-color: #26212c;
    height: 11em;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 1em;
    word-break: break-word!important;
    transition: 0.5s;
    -webkit-box-shadow: 10px 10px 16px -5px rgba(0, 0, 0, 0.46);
    -moz-box-shadow: 10px 10px 16px -5px rgba(0, 0, 0, 0.46);
    box-shadow: 10px 10px 16px -5px rgba(0, 0, 0, 0.46);
    transform: translateY(150px);
    opacity: 0;
    animation: come-in 0.6s ease forwards;
  }

  .feature-card:nth-child(1) {animation-delay: 0.0s; }
  .feature-card:nth-child(2) {animation-delay: 0.5s; }
  .feature-card:nth-child(3) {animation-delay: 1.0s; }
  .feature-card:nth-child(4) {animation-delay: 1.5s; }
  .feature-card:nth-child(5) {animation-delay: 2.0s; }
  .feature-card:nth-child(6) {animation-delay: 2.5s; }
  .feature-card:nth-child(7) {animation-delay: 3.0s; }
  .feature-card:nth-child(8) {animation-delay: 3.5s; }
  .feature-card:nth-child(9) {animation-delay: 4.0s; }
  .feature-card:nth-child(10) {animation-delay: 4.5s; }
  .feature-card:nth-child(11) {animation-delay: 5.0s; }
  .feature-card:nth-child(12) {animation-delay: 5.5s; }

  @keyframes come-in {
    to { 
      opacity: 1;
      transform: translateY(0);
    }
  }

  .feature-icon {
    position: absolute;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    left: -.2em;
    font-size: 8em;
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke-width: 6px;
    -webkit-text-stroke-color: #1d1922;
    opacity: 0.5;
  }

  .feature-title {
    position: relative;
    font-size: 1.7em;
    font-weight: bold;
    top: -1em;
  }

  .feature-description {
    color: rgb(151, 148, 148);
    font-size: 0.8em;
    position: relative;
    top: -2em;
  }

  @media screen and (min-width: 770px) {
    .feature-container {
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
    }

    .tier-wrapper {
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
    }

    .service-wrapper {
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
    }
  }

  @import url("https://p.typekit.net/p.css?s=1&k=yhe5qmq&ht=tk&f=24545.24547&a=21372817&app=typekit&e=css");

  @font-face {
    font-family:"sofia-pro";
    src: url("https://use.typekit.net/af/b4d13d/00000000000000003b9b1a9a/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3") format("woff2"),url("https://use.typekit.net/af/b4d13d/00000000000000003b9b1a9a/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3") format("woff"),url("https://use.typekit.net/af/b4d13d/00000000000000003b9b1a9a/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3") format("opentype");
    font-display: auto;
    font-style: normal;
    font-weight: 500;
  }

  @font-face {
    font-family:"sofia-pro";
    src: url("https://use.typekit.net/af/5855b2/00000000000000003b9b1a98/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3") format("woff2"),url("https://use.typekit.net/af/5855b2/00000000000000003b9b1a98/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3") format("woff"),url("https://use.typekit.net/af/5855b2/00000000000000003b9b1a98/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3") format("opentype");
    font-display: auto;
    font-style: normal;
    font-weight: 400;
  }

  .tk-sofia-pro {
    font-family: "sofia-pro",sans-serif;
  }


  @-webkit-keyframes scale {
    0% {
      -webkit-transform: scale(1);
      transform: scale(1);
      opacity: 1;
    }
    45% {
      -webkit-transform: scale(0.1);
      transform: scale(0.1);
      opacity: 0.7;
    }
    80% {
      -webkit-transform: scale(1);
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes scale {
    0% {
      -webkit-transform: scale(1);
      transform: scale(1);
      opacity: 1;
    }
    45% {
      -webkit-transform: scale(0.1);
      transform: scale(0.1);
      opacity: 0.7;
    }
    80% {
      -webkit-transform: scale(1);
      transform: scale(1);
      opacity: 1; 
    }
  }

  .page-pulse > div:nth-child(1) {
    -webkit-animation: scale 0.75s -0.24s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
    animation: scale 0.75s -0.24s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
  }

  .page-pulse > div:nth-child(2) {
    -webkit-animation: scale 0.75s -0.12s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
    animation: scale 0.75s -0.12s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
  }

  .page-pulse > div:nth-child(3) {
    -webkit-animation: scale 0.75s 0s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
    animation: scale 0.75s 0s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
  }

  .page-pulse > div {
    background-color: #fff;
    width: 1.2em;
    height: 1.2em;
    border-radius: 100%;
    margin: 2px;
    position: relative;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    display: inline-block;
  }

  .style-chooser .vs__search::placeholder,
  .style-chooser .vs__dropdown-toggle,
  .style-chooser .vs__dropdown-menu {
    background: rgba(0, 0, 0, 0.1);
    border: none;
    color: #fff;
  }

  .vs__search, .vs__search:focus, .vs__selected {
    color: #fff!important;
  }

  .style-chooser .vs__clear,
  .style-chooser .vs__open-indicator {
    fill: #fff;
  }

  .vs--single .vs__selected {
    color: #fff;
  }

  .vs--searchable .vs__dropdown-toggle {
    padding: 8px;
    background-color: #111017;
    height: 40px!important;
    border-radius: 3px;
    border: solid 1px #3b3b3d;
  }

  .vs--searchable .vs__dropdown-toggle:hover {
    border-color: #446fff;
  }

  .vs__dropdown-option {
    background-color: #111017!important;
    color: #fff!important; 
  }

  .vs__clear svg path,
  .vs__open-indicator {
    fill: rgb(256,256,256)!important;
  }

  .vs__dropdown-menu {
    background-color: rgba(0,0,0,.1)
  }

  .vs__search,
  .vs__search:focus {
    margin: 0!important;
    padding: 0!important;
  }

  .vs--single.vs--open .vs__selected {
    color: #fff!important;
  }

  .vs--single.vs--open .vs__selected {
    position: relative;
    bottom: 5px;
    left: -9px;
  }

  .vs--single .vs__selected {
    position: relative;
    bottom: 5px;
    left: -9px;
  }

  .vs__selected {
    background-color: transparent!important;
  }

  .vs__search, .vs__search:focus, .vs__selected {
    position: relative;
    top: -4px;
  }

  .vs__dropdown-menu {
    background-color: #111017!important;
  }
  
  .outline-text {
    -webkit-text-fill-color: #4470ff54;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: #446fff;
  }

  .form-field-file-input {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  .form-field-file-input + .form-field-file-input-label {
    width: 100%;
    height: 40px;
    background-color: rgba(0, 0, 0, 0.1);
    padding: 0.50em 0.60em;
    color: #ffffff;
    border: solid 1px #3b3b3d;
    border-radius: 3px;
    cursor: pointer;
    display: block;
  }

  .form-field-file-input + .form-field-file-input-label * {
    pointer-events: none;
  }

  .form-field-file-input + .form-field-file-input-label:focus, .form-field-file-input + .form-field-file-input-label:hover {
    border-color: #446fff;
  }

  .add-tier:hover {
    color: rgb(170, 170, 170);
  }

  .service-section-title {
    font-size: 1.5em;
    display: block;
  }

  .link {
    text-decoration: none;
    color: #446fff;
  }

  .service-card-banner {
    width: 400px;
    height: 200px;
    display: block;
    position: relative;
    top: -15px;
    box-shadow: 10px 10px 16px -5px rgba(0, 0, 0, 0.46);
  }

  .service-keywords {
    color: #949494;
    font-size: .9em;
  }

  .service-description {
    font-size: 1em;
    margin-top: .7em;
    width: 100%;
    overflow: hidden;
    text-align: center;
  }

  .star-wrap {
    color: #ffc039;
    font-size: 1.6em;
    margin-top: .2em;
  }

  .service-owner {
    float: left;
  }

  .service-owner .owner-avatar {
    position: absolute;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    top: 27.3em;
    left: 1em;
  }

  .service-owner .owner-name {
    position: absolute;
    top: 30.5em;
    left: 5.5em;
    font-weight: bold;
  }

  .service-owner .owner-join {
    position: absolute;
    top: 32em;
    left: 5.5em;
  }

  .small {
    color: #fff;
    font-size: .65em;
  }
</style>
