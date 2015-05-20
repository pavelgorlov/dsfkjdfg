<?
	
$nocache = '?4';

//Chair templates
if(!empty($_REQUEST['chair'])){
	
	$chair_arr = array(
		'320' => '_320.html',
		'330' => '_330.html',
		'737' => '_737.html',
		'777' => '_777.html',
		'SSJ' => '_SSJ.html'
	);
	
	$chair = $_REQUEST['chair'];
	
	if(!empty($chair_arr[$chair])){
	
		include_once('markup2/'.$chair_arr[$chair]);	
	}

	exit;	
}


//Page templates
$file = !empty($_REQUEST['page']) ? $_REQUEST['page'] : 'econom-before-flight';

//Page links
$_links = array(
	'econom-before-flight',
    'econom-on-board',
    'econom-after-flight',
    
    'comfort-before-flight',
    'comfort-on-board',
    'comfort-after-flight',
    
    'business-before-flight',
    'business-on-board',
    'business-after-flight'
);


//Page template files
$pages = array(
    $_links[0] => 'econom_1.html',
    $_links[1] => 'econom_2.html',
    $_links[2] => 'econom_3.html',
    
    $_links[3] => 'comfort_1.html',
    $_links[4] => 'comfort_2.html',
    $_links[5] => 'comfort_3.html',
    
    $_links[6] => 'business_1.html',
    $_links[7] => 'business_2.html',
    $_links[8] => 'business_3.html'
);

//Redirect to 404-page
function page404(){ ?><script>window.top.location.href="http://www.aeroflot.ru/404"</script><? }


//Check for menu item
if(!empty($pages[$file])){
 
 	$template = 'markup2/'.$pages[$file];   
    
    //Check for file exist
    if(!file_exists($template)) {
    
    	page404();
    	exit;
	}

} else {
	
	page404();
	exit;
}


//$_classes = array('класс Эконом','класс Комфорт','класс Бизнес');
//$_
//, 'Перед полетом','На борту','После полета');





//Generate menu links
$menu = array();

for($i=0,$j=count($_links);$i<$j;$i++){
	array_push($menu, '?page='.$_links[$i]);
}
	        
        	
	
?><!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" xml:lang="ru" xmlns="http://www.w3.org/1999/xhtml" lang="ru">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="apple-itunes-app" content="app-id=580243869" />
<!--[if gt IE 8]><meta http-equiv="X-UA-Compatible" content="IE=edge" /><![endif]-->
<!--[if lte IE 8]><meta http-equiv="X-UA-Compatible" content="IE=8" /><![endif]-->
<title>Три класса | Аэрофлот</title>
<link charset="UTF-8" href="https://www.aeroflot.ru/cms/sites/all/themes/aeroflot/common/full/reset.css" rel="stylesheet" type="text/css" media="screen" />
<link charset="UTF-8" href="https://www.aeroflot.ru/cms/sites/all/themes/aeroflot/common/full/colorbox.min.css" rel="stylesheet" type="text/css" media="screen" />
<link charset="UTF-8" href="https://www.aeroflot.ru/cms/sites/all/themes/aeroflot/common/full/layout.css" rel="stylesheet" type="text/css" media="screen" />
<link charset="UTF-8" href="https://www.aeroflot.ru/cms/sites/all/themes/aeroflot/common/full/layout3.css" rel="stylesheet" type="text/css" media="screen" />
<link charset="UTF-8" href="https://www.aeroflot.ru/personal/static/style/jquery-ui-theme/smoothness/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
<link charset="UTF-8" href="https://www.aeroflot.ru/personal/static/full/full.css?20141003" rel="stylesheet" type="text/css" />
<link charset="UTF-8" href="https://www.aeroflot.ru/personal/static/full/full3.css?20141003" rel="stylesheet" type="text/css" />
<link charset="UTF-8" href="https://www.aeroflot.ru/personal/static/full/user_menu.css" rel="stylesheet" type="text/css" />
<link charset="UTF-8" href="https://www.aeroflot.ru/personal/static/full/cab.css?20141003" rel="stylesheet" type="text/css" />
<link charset="UTF-8" href="https://www.aeroflot.ru/personal/static/style/calendar-blue.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="https://www.aeroflot.ru/cms/sites/all/themes/aeroflot/common/js/jquery-1.11.0.min.js"></script>
<script type="text/javascript" src="https://www.aeroflot.ru/cms/sites/all/themes/aeroflot/common/js/jquery.colorbox-1.5.4.min.js"></script>
<script type="text/javascript" src="https://www.aeroflot.ru/cms/sites/all/themes/aeroflot/common/js/jquery.cycle-3.0.3.min.js"></script>
<script type="text/javascript" src="https://www.aeroflot.ru/cms/sites/all/themes/aeroflot/common/js/layout.js"></script>
<script src="https://www.aeroflot.ru/personal/static/js/calendar.js" type="text/javascript"></script>
<script src="https://www.aeroflot.ru/personal/static/js/calendar-ru.js" type="text/javascript"></script>
<script src="https://www.aeroflot.ru/personal/static/js/calendar-setup.js" type="text/javascript"></script>
<script src="https://www.aeroflot.ru/personal/static/js/jquery.popover.js" type="text/javascript"></script>
<script src="https://www.aeroflot.ru/personal/static/js/jquery-ui-1.10.4.custom.min.js" type="text/javascript"></script>
<script src="htts://www.aeroflot.ru/personal/static/js/jquery.validate.min.js" type="text/javascript"></script>
<link type="text/css" rel="stylesheet" charset="UTF-8" href="https://www.aeroflot.ru/personal/static/full/full.css" />
<link type="text/css" rel="stylesheet" charset="UTF-8" href="https://www.aeroflot.ru/personal/static/full/full3.css" />
<!-- Google Analytics -->
<script type="text/javascript">
      var _gaq = _gaq || [];
      _gaq.push(['_setAccount', 'UA-15394576-1']);
      _gaq.push(['_setDomainName', 'none']);
      _gaq.push(['_setAllowLinker', true]);
      _gaq.push(['_trackPageview']);

      (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = 'https://www.aeroflot.ru/personal/static/js/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
      })();

    </script>
</head>
<body class="page-type-ext">
<noscript>
<div class="js_disabled"> В вашем браузере отключена поддержка JavaScript! Для нормальной работоспособности сайта необходимо разрешить использование JavaScript. </div>
</noscript>
<div class="main-body">
    <div class="main-header" style="background-color: #	02458c"> <a class="logo" href="https://www.aeroflot.ru/cms/ru/" title="Компания Аэрофлот"><img width="286" height="80" src="https://www.aeroflot.ru/cms/sites/all/themes/aeroflot/common/images/logo_ru.gif" alt="Компания Аэрофлот" /></a> <a class="logo" href="http://www.skyteam.com/ru/" title="Альянс SkyTeam"><img width="42" height="80" src="https://www.aeroflot.ru/cms/sites/all/themes/aeroflot/common/images/logo_skyteam.png" alt="Альянс SkyTeam" /></a>
        <div class="language-selector"> <img src="https://www.aeroflot.ru/cms/sites/all/themes/aeroflot/media/img/top_lang_ru.png" />
            <div style="display: none;"> <a data-language="ru" data-href="https://www.aeroflot.ru/personal/set_lang/en" href="#">ENG</a> </div>
        </div>
        <a title="Поиск" href="https://www.aeroflot.ru/cms/search/"><img src="https://www.aeroflot.ru/cms/sites/all/themes/aeroflot/common/images/top_find.png" alt="Поиск" /></a> <a title="Карта сайта" href="https://www.aeroflot.ru/cms/sitemap/"><img src="https://www.aeroflot.ru/cms/sites/all/themes/aeroflot/common/images/top_map.png" alt="Карта сайта" /></a> <a title="Домашняя страница" href="https://www.aeroflot.ru/cms/"><img src="https://www.aeroflot.ru/cms/sites/all/themes/aeroflot/common/images/top_home.png" alt="Домашняя страница" /></a> <a title="Вход в личный кабинет" href="https://www.aeroflot.ru/personal/login?_preferredLanguage=ru"><img src="https://www.aeroflot.ru/cms/sites/all/themes/aeroflot/common/images/login_ru.png" alt="Вход в личный кабинет"/></a> <a title="Контакты" href="https://www.aeroflot.ru/cms/about/contact/"><img src="https://www.aeroflot.ru/cms/sites/all/themes/aeroflot/common/images/cont_ru.png" alt="Контакты" /></a> <a title="Новости" href="https://www.aeroflot.ru/cms/news/"><img src="https://www.aeroflot.ru/cms/sites/all/themes/aeroflot/common/images/news_ru.png" alt="Новости" /></a> <a title="Обратная связь" href="https://www.aeroflot.ru/feedback?_preferredLanguage=ru"><img src="https://www.aeroflot.ru/cms/sites/all/themes/aeroflot/common/images/feedback_ru.png" alt="Обратная связь" /></a> </div>
    <div class="header-print-only"> <img alt="Компания Аэрофлот" src="https://www.aeroflot.ru/cms/sites/all/themes/aeroflot/common/images/logo_print.gif" width="200" height="50" border="0" />
        <div> Москва: +7 (495) 223-5555 / Россия: 8-800-444-5555 (бесплатный) </div>
    </div>
    <div id="topnav">
        <div id="topmenu">
            <ul class="menu">
                <li class="expanded first"><a href="https://www.aeroflot.ru/cms/booking/"><i style="background:url(https://www.aeroflot.ru/cms/sites/all/themes/aeroflot/common/images/menu_sprites/973.png)"></i><strong>Купить билет</strong></a></li>
                <li class="expanded  active-trail"><a href="https://www.aeroflot.ru/cms/online_services/"><i style="background:url(https://www.aeroflot.ru/cms/sites/all/themes/aeroflot/common/images/menu_sprites/17163.png)"></i><strong>Онлайн-сервисы</strong></a></li>
                <li class="expanded "><a href="https://www.aeroflot.ru/cms/special_offers/"><i style="background:url(https://www.aeroflot.ru/cms/sites/all/themes/aeroflot/common/images/menu_sprites/989.png)"></i><strong>Специальные предложения</strong></a></li>
                 <li class="expanded"><a href="https://www.aeroflot.ru/cms/information_services/"><i style="background:url(https://www.aeroflot.ru/cms/sites/all/themes/aeroflot/common/images/menu_sprites/992.png)"></i><strong>Информация и услуги</strong></a></li>
                <li class="expanded  last"><a href="https://www.aeroflot.ru/cms/afl_bonus/"><i style="background:url(https://www.aeroflot.ru/cms/sites/all/themes/aeroflot/common/images/menu_sprites/1048.png)"></i><strong>Аэрофлот Бонус</strong></a></li>
            </ul>
            <div class="clear0"></div>
        </div>
    </div>
    <div class="main-container">

        <!-- content place --->
        <link rel="stylesheet" href="css/comfort.css<?= $nocache ?>">
		<link rel="stylesheet" href="css/fancybox.css<?= $nocache ?>">
		
        <?php 
		
			//Insert page body
	        include_once($template); 
		?>
        
        <script src="js2/jquery.class.assets.js<?= $nocache ?>"></script>
		<script src="js2/jquery.class.js<?= $nocache ?>"></script>
		<script src="js2/jquery.class.d3.js<?= $nocache ?>"></script>
		<!-- /content place --->
        
    </div>
    <div class="clear0"></div>
</div>
<div class="block-banner">
    <div class="fl-down" data-ratio="0.22" data-deafult-image="https://www.aeroflot.ru/cms/sites/all/themes/aeroflot/common/images/banners/footer_ru.jpg" data-defualt-href="https://www.aeroflot.ru/cms/ru/special_offers/"></div>
</div>
<div class="main-footer">
    <table width="100%"  border="0" cellspacing="0" cellpadding="0" class="footer">
        <tr>
            <td width="24%"><h4>Контакты</h4>
                <div class="phones"><span class="ph_office">МОСКВА</span>&nbsp;<span class="comment">+7-495-223-55-55</span><br />
                    <span class="mar">РОССИЯ</span>&nbsp;<span class="comment">8-800-444-55-55</span> <br />
                    <span class="ph_office"></span>&nbsp;<span class="comment"><a href="https://www.aeroflot.ru/cms/offices/free_numbers/" target="_blank">Бесплатные телефоны по всему миру</a></span> <br />
                    <span class="ph_office"></span>&nbsp;<span class="comment"><a href="https://www.aeroflot.ru/feedback?_preferredLanguage=ru" target="_blank">Обратная связь</a></span> </div>
                <br />
                <a id="cbx_footer" href="#" title="Подробности" class="cboxElement"><img src="https://www.aeroflot.ru/cms/sites/all/themes/aeroflot/common/images/footer/button_call.png" alt="Позвонить с сайта" /></a> </td>
            <td width="24%"><h4>Аэрофлот в социальных сетях</h4>
                <p class="social_icons"> <a href="https://twitter.com/aeroflot" title="Twitter" target="_blank"><img src="https://www.aeroflot.ru/cms/sites/all/themes/aeroflot/common/images/footer/tw.jpg" width="30" height="30" alt="Twitter" /></a
                            >&nbsp;<a href="http://www.facebook.com/aeroflot" title="Facebook" target="_blank"><img src="https://www.aeroflot.ru/cms/sites/all/themes/aeroflot/common/images/footer/fb.jpg" width="30" height="30" alt="Facebook" /></a
                            >&nbsp;<a href="http://vk.com/aeroflot" title="Вконтакте" target="_blank"><img src="https://www.aeroflot.ru/cms/sites/all/themes/aeroflot/common/images/footer/vk.jpg" width="30" height="30" alt="Вконтакте" /></a
                            >&nbsp;<a href="http://www.youtube.com/user/AeroflotRussia/videos" title="YouTube" target="_blank"><img src="https://www.aeroflot.ru/cms/sites/all/themes/aeroflot/common/images/footer/yt.jpg" width="30" height="30" alt="YouTube" /></a
                            >&nbsp;<a href="http://www.instagram.com/aeroflot" title="Instagram" target="_blank"><img src="https://www.aeroflot.ru/cms/sites/all/themes/aeroflot/common/images/footer/inst.jpg" width="30" height="30" alt="Instagram" /></a> </p>
                <ul>
                    <li class="mob"><a href="//m.aeroflot.ru/cms/">Мобильный сайт</a></li>
                    <li class="mob"><a href="https://www.aeroflot.ru/cms/about/">О компании</a></li>
                </ul></td>
            <td width="24%"><h4>Для клиентов</h4>
                <ul>
                    <li><a href="https://www.aeroflot.ru/cms/online_registration/">Регистрация</a></li>
                    <li><a href="https://www.aeroflot.ru/cms/time_table/online/">Онлайн-табло</a></li>
                    <li><a href="https://www.aeroflot.ru/schedule/schedule?_preferredLanguage=ru">Расписание</a></li>
                    <li><a href="https://www.aeroflot.ru/cms/time_table/information/">Статус рейса</a></li>
                    <li><a href="https://www.aeroflot.ru/cms/sitemap/">Карта сайта</a></li>
                    <li><a title="Политика конфиденциальности" id="cbx_booking1" href="https://www.aeroflot.ru/cms/booking/privacy_policy/" class="cboxElement">Политика конфиденциальности</a></li>
                </ul></td>
            <td width="24%"><h4>Для партнеров</h4>
                <p id="corporate_entrance"><a href="https://www.aeroflot.ru/cms/special_offers/corporate/">Корпоративным клиентам</a></p>
                <p id="agents_entrance"><a href="https://www.aeroflot.ru/cms/about/agents_information/">Агентам</a></p>
                <p id="cargo_trans"><a href="https://www.aeroflot.ru/cms/cargo_transport/">Грузовые перевозки</a></p>
                <p id="afl_group"><a href="https://www.aeroflot.ru/cms/about/subsidiaries/">Группа Аэрофлот</a></p>
                <p class="ph_rss"><a href="https://www.aeroflot.ru/cms/about/rss_info/">RSS подписка</a></p></td>
        </tr>
    </table>
    <p class="cop">© Аэрофлот 2008-2014</p>
    <div style="display: none;">
        <div id="call_form">
            <div>
                <p class="freecall_header">Для бесплатного звонка в контакт-центр подключите наушники и микрофон к Вашему компьютеру.</p>
                <p>Контакт-центр работает круглосуточно.</p>
                <div class="callbuttons">
                    <object width="300" height="180">
                        <param name="" value="https://www.aeroflot.ru/cms/sites/all/themes/aeroflot/common/swf/dstar-aero.swf" />
                        <embed src="https://www.aeroflot.ru/cms/sites/all/themes/aeroflot/common/swf/dstar-aero.swf" width="300" height="180"></embed>
                    </object>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
        $(document).ready(function() {
            Layout.init({
                languageCookieName: 'AFL_language',
                topMenuDelay: 0,
                skipTopMenuFirstItem: true
            });
        });
    </script>
</body>
</html>
