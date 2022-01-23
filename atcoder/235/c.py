from collections import defaultdict

N, Q = map(int, input.split())
A = list(map(int, input().split()))

m = defaultdict(list)
for i in range(N):
    m[A[i]].append(i+1)

for _ in range(Q):
    x, k = map(int, input().split())
    if k <= len(m[x]):
        print(m[x][k-1])
    else:
        print(-1)