
clear, clc
close all

% моделирование
h = 0.01;
n = 100;
N = 1000;
% моделирование

t = zeros(1, n);

sig = zeros(1, n);

M = zeros(1, n);
m = zeros(1, n);

ft = zeros(n);
x6t = zeros(6, n);
psi = zeros(1, n);
xt = zeros(N, n);
Kf = zeros(n);

s1 = 0;
s2 = 0;
s3 = 0;

for i = 1:n
t(i) = (i - 1) * h;
m(i) = 1.0;
end

K = zeros(n);
for i = 1:n
    for j = 1:n
        K(i, j) = 2.0 * exp(-2 * sqrt(abs(t(i) - t(j))));
    end
end

for i = 1:n
    ft(i,i) = 1;
    for j = i+1:n
        for k = 1:i-1
            s1 = s1 + power(ft(k,i), 2) * sig(k);
            s2 = s2 + ft(k, i) * ft(k, j) * sig(k);
        end
        sig(i) = K(i, i) - s1;
        ft(i,j) = (K(i, j) - s2) / sig(i);
        s1 = 0;
        s2 = 0;
    end
end

for alpha = 1:N
    for i = 1:n
        b = rand(6,1);
        Sb = sum(b);
        psi(i) = sqrt(2) * sqrt(sig(i)) * (Sb - 3) + 0;
    end
    SUM = 0;
    for i = 1:n
        for k = 1:i
            SUM = SUM + psi(k) * ft(k,i);
        end
        xt(alpha, i) = m(i) + SUM;
        SUM = 0;
    end
end

for alpha = 1:6
    for i = 1:n
        x6t(alpha, i) = xt(alpha, i);
    end
end

figure(1);
plot(t, x6t);
for i = 1:n
    for j = 1:N
        SUM = SUM + xt(j, i);
    end
    M(i) = SUM / N;
    SUM = 0;
end

figure(2);
plot(t, M, '.', t, m, '-');
ylim([1, 1.5]);
for i = 1:n
    for j = 1:n
        for alpha = 1:N
            s1 = s1 + xt(alpha, i) * xt(alpha, j);
            s2 = s2 + xt(alpha, i);
            s3 = s3 + xt(alpha, j);
        end
        Kf(i,j) = (s1 - (s2 * s3) / N) / (N - 1);
        s1 = 0;
        s2 = 0;
        s3 = 0;
    end
end

Kf0t = zeros(1, n);
K0t = zeros(1, n);
for j = 1:n
    K0t(j) = K(1, j);
    Kf0t(j) = Kf(1, j);
end
figure(3);
plot(t, Kf0t, '.', t, K0t, '-');



