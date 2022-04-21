def f(a):
    ret, s = 0, 0
    for x in a:
        if x == 1:
            ret += s * (s + 1)
            s = 0
        else:
            s += 1
    ret += s * (s + 1)
    return ret

N, X, Y = map(int, input().split())
A = list(map(int, input().split()))
__, X_, _Y, XY = [0] * N, [0] * N, [0] * N, [0] * N

for i in range(N):
    if not (Y == A[i] and A[i] <= X):
        __[i], X_[i], _Y[i], XY[i] = 1, 1, 1, 1
    if A[i] == X:
        X_[i], XY[i] = 1, 1
    if A[i] == Y:
        _Y[i], XY[i] = 1, 1

print(f(__) - f(X_) - f(_Y) + f(XY))