from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
import ipdb
# enable browser logging
d = DesiredCapabilities.CHROME
d['loggingPrefs'] = { 'browser':'ALL' }
driver = webdriver.Chrome(desired_capabilities=d,  executable_path='/home/august/crawl/chromedriver')
# load some site
driver.get('https://github.com/hi-august/')
# print messages
ipdb.set_trace()
for entry in driver.get_log('browser'):
    print entry
