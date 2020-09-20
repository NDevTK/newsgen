<ul>
  {% for post in site.fakenews %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
<a href="https://news.ndev.tk/rss"><img border="0" alt="Subscribe to What's New" src="rss.png" width="25" height="25"><a href="https://discord.gg/kFRm5Dv"><img border="0" alt="Subscribe to What's New" src="discord.png" width="25" height="25">
