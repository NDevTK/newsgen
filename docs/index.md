{% for page in site.pages %}
  {% if page.extname == 'html' %}
         <li><a href="{{ page.url }}">{{ page.title }}</a></li>
  {% endif %}
{% endfor %}
