N = int(input())
N = list(map(int, input().split()))
pos = 0
while pos+1<N and H[pos]<H[pos+1]: pos += 1
print(H[pos])