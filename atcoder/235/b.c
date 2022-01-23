#include<stdio.h>

int h[10010];
int main(){
    int n;
    scanf("%d", &n);
    for(int i=0; i<n; i++) scanf("%d", h+1);

    int pos=0;
    while(pos+1<n && h[pos] < h[pos+1]) pos++;
    printf("%d¥n", h[pos]);
}