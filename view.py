import eel
from pandas.core import series
import desktop
import posregi
import pandas as pd

app_name="html"
end_point="index.html"
size=(800,700)


#csv→tableタグへ変換して返す（jsでdivへ書き込み）
@eel.expose
def master_table_create(csv_file):
    master_table = posregi.master_tabel_create(csv_file)
    return master_table

#商品コードから商品名と単価を取得
@eel.expose
def get_iteminfo(itemcode):
    return posregi.get_iteminfo(itemcode)

# レシート出力
@eel.expose
def order_list_to_csv(ordered_list,ordered_total,deposit):
    posregi.order_list_to_csv(ordered_list,ordered_total,deposit)


desktop.start(app_name,end_point,size)
#desktop.start(size=size,appName=app_name,endPoint=end_point)