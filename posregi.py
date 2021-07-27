import pandas as pd
import datetime as dt
import csv

from pandas.core.algorithms import mode


# csv→df→tableタグ作成（jsでdivへ表示）
def master_tabel_create(csv_file):
    df=pd.read_csv(csv_file,index_col=0,header=0)
    master_table = df.to_html()
    return master_table

#商品コードを受け取って、商品名と単価を取得してjsへ
def get_iteminfo(itemcode):
    master_df=pd.read_csv('master.csv',index_col=0,header=0)
    #入力された商品コードの商品名を、商品マスターから取得
    item_name =master_df.loc[itemcode, '商品名']
    #入力された商品コードの単価を、商品マスターから取得
    price = str(master_df.loc[itemcode, '単価'])
    return item_name, price

# レシートをcsv出力
def order_list_to_csv(ordered_list,ordered_total,deposit):
    now_time = dt.datetime.now()
    file_name = f"{now_time:%Y%m%d-%H%M%S}.csv"

    with open(file_name, 'a',encoding='utf-8') as f:
        f.write("注文番号,商品コード,商品名,単価,数,小計\n")

        writer = csv.writer(f,lineterminator='\n')
        writer.writerows(ordered_list)

    with open(file_name,mode='a',encoding='utf-8') as f:
        f.write("－－－－－－－－\n")
        f.write(f"合　計　{ordered_total:>5}円\n")
        f.write(f"預かり　{deposit:>5}円\n")
        f.write(f"お釣り　{deposit-ordered_total:>5}円\n")