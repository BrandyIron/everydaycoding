#include<bits/stdc++.h>
using namespace std;
int main(){
    char a, b, c;
    cin >> a >> b >> c;
    string abc = string({a, b, c});
    string bca = string({b, c, a});
    string cab = string({c, a, b});
    int ans = stoi(abc) + stoi(bca) + stoi(cab);
    cout << ans << endl;
}