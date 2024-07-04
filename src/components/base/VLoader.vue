<template>
    <div class="loader">
        <div class="loader__spin"></div>

        <div class="loader__icon">
            <svg
                width="29"
                height="31"
                viewBox="0 0 29 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g clip-path="url(#clip0_2098_4065)">
                    <path
                        d="M17.4626 7.14778C18.3552 7.50714 19.1063 8.02184 19.7602 8.71969C20.4232 9.42914 20.9542 10.3357 21.3437 11.4114C21.7494 12.5359 21.9557 13.8852 21.9557 15.42C21.9557 16.9548 21.7517 18.3088 21.3483 19.4634C20.9634 20.5623 20.4302 21.4897 19.7602 22.2154C18.8305 23.2239 17.7037 23.8638 16.2547 24.2046C15.0073 24.4991 13.6881 24.5037 12.4385 24.2208C10.9547 23.887 9.80936 23.2448 8.87503 22.2223C8.20731 21.4944 7.67407 20.5647 7.29153 19.4611C6.88812 18.3111 6.68409 16.9502 6.68409 15.42C6.68409 13.8898 6.89043 12.559 7.29616 11.4369C7.68334 10.3635 8.21891 9.45928 8.8843 8.75215C9.54738 8.04966 10.3125 7.53033 11.2259 7.16169C12.1649 6.78378 13.2244 6.59367 14.3767 6.59367C15.529 6.59367 16.5398 6.78147 17.4626 7.1501M24.6405 4.32159C23.3584 2.93748 21.8097 1.85708 20.0384 1.10822C18.2856 0.370951 16.3659 -0.00231934 14.3303 -0.00231934C12.2947 -0.00231934 10.3519 0.370951 8.60609 1.11054C6.8487 1.85476 5.30693 2.92588 4.02019 4.29609C2.74273 5.65702 1.73884 7.30775 1.03867 9.20193C0.347768 11.066 0 13.1572 0 15.4177C0 17.6782 0.343131 19.7462 1.02012 21.6126C1.71102 23.5207 2.69868 25.19 3.96223 26.5718C5.2397 27.9721 6.78147 29.071 8.54581 29.8408C10.3055 30.6082 12.2507 31 14.3303 31C16.41 31 18.3529 30.6082 20.1056 29.8385C21.8653 29.0664 23.4024 27.9628 24.6799 26.5532C25.9411 25.1621 26.9288 23.4929 27.6174 21.5894C28.2944 19.7184 28.6375 17.6388 28.6375 15.4154C28.6375 13.192 28.2897 11.0891 27.5988 9.22511C26.8987 7.33789 25.904 5.68716 24.6405 4.32159Z"
                        fill="url(#paint0_linear_2098_4065)"
                    />
                </g>

                <defs>
                    <linearGradient
                        id="paint0_linear_2098_4065"
                        x1="14.3187"
                        y1="31"
                        x2="14.3187"
                        y2="-2.26495e-06"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stop-color="#495AFF" />

                        <stop offset="1" stop-color="#0ACFFE" />
                    </linearGradient>

                    <clipPath id="clip0_2098_4065">
                        <rect width="28.6375" height="31" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        </div>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped>
    .loader {
        width: 80px;
        height: 80px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .loader__spin {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 5px solid #fff;
        border-top-color: #495aff;
        animation: spin 1s linear infinite;
    }

    .loader__icon {
        width: 45%;
        height: 45%;
        animation: flip 2s linear infinite;
    }

    svg {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    @keyframes flip {
        from {
            transform: rotateY(0deg);
        }
        to {
            transform: rotateY(360deg);
        }
    }
</style>
