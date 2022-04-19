#include<bits/stdc++.h>
using namespace std;
int main(void){
    int Q;
    cin >> Q;
    vector<long long> type_2;
    vector<pair<long long, long long>> vec;
    while(Q--){
        int q;
        cin >> q;
        if(q==1){
            long long x, c;
            cin >> x >> c;
            vec.push_back(make_pair(x,c));
        }
        else{
            long long c;
            cin >> c;
            type_2.push_back(c);
        }
    }
    int idx=0;
    for(auto &c:type_2){
        long long ans=0;
        while(c){
            if(vec[idx].second==0) idx++;
            else{
                long long take=min{c,vec[idx].second};
                ans+=take+vec[idx].first;
                c-=take;
                vec[idx].second-=take;
            }
        }
        cout << ans << endl;
    }
}