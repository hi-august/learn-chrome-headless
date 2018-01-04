# coding: utf-8
from selenium import webdriver
import ipdb

chrome_options = webdriver.ChromeOptions()
# chrome_options.add_argument('--headless')
chrome_options.add_argument('--disable-gpu')

client = webdriver.Chrome(chrome_options=chrome_options, executable_path='/home/august/crawl/chromedriver')    # 如果没有把chromedriver加入到PATH中，就需要指明路径

client.get("http://wenshu.court.gov.cn/List/List?sorttype=1&conditions=searchWord+++2017-12-11%20TO%202017-12-12+%E4%B8%8A%E4%BC%A0%E6%97%A5%E6%9C%9F:2017-12-11%20TO%202017-12-12&conditions=searchWord+2+AJLX++%E6%A1%88%E4%BB%B6%E7%B1%BB%E5%9E%8B:%E5%88%91%E4%BA%8B%E6%A1%88%E4%BB%B6")
# client.get("http://v.youku.com/v_show/id_XMzIxMzYwODE3Ng==.html?spm=a2hww.20027244.ykRecommend.5~5")

content = client.page_source.encode('utf-8')
ipdb.set_trace()
print content

client.quit()
