#!/bin/bash

echo ---------//----------//-------------
# Import System Variables ########## From Global ######
export timeout_duration="$timeout_duration"
echo $timeout_duration
export elapsed_time="$elapsed_time"
echo $elapsed_time
export condition1_met="$condition1_met"
echo $condition1_met
export start_time=$SECONDS
echo $start_time

echo ---------//----------//-------------
# ######################################################
# condition2_met=${condition2_met}
# echo $condition2_met
########################################################

echo ---------//----------//-------------
# Test ############ Crossroads Point #####################
set +e
kubectl get pods -n profile-site
proSite=$?
kubectl get pods -n ingress-nginx
ingNginx=$?
set -e
if [ "$proSite" -ne 0 ] || [ "$ingNginx" -ne 0 ]; then
    set +e
    kops update cluster --config=/home/ansible/.kube/config --name=kubecluster.shahdevelopment.tech --state=s3://kubedevops001 --yes --admin

    # Test ############ Crossroads Point #################
    kubectl get pods -n profile-site
    proSite=$?
    kubectl get pods -n ingress-nginx
    ingNginx=$?
    set -e
    if [ "$proSite" -ne 0 ] || [ "$ingNginx" -ne 0 ]; then
        set +e
        /home/ansible/kube/./default-scale && sleep 2
        echo "Checking cluster availability........"
        kops validate cluster shahdevelopment.tech --state=s3://devops001 --wait 10m
        set -e
        # Loop ############ Continually Scans for Uptime #######
        while ! $condition1_met; do
            # && ! $condition2_met; do

            # Test ############ Logical Test of Time ########
            if [ "$elapsed_time" -gt "$timeout_duration" ]; then
                echo "Timeout reached"
                set +e
                # Test ############ Crossroads Point ########
                kubectl get pods -n profile-site
                proSite=$?
                kubectl get pods -n ingress-nginx
                ingNginx=$?
                echo "Cluster update failed. Temporarily unable to resolve endpoint"
                set -e
                # Test ############ Output is Written #########
                if [ "$proSite" -ne 0]; then
                    echo "profile-site namespace failed to update"
                fi

                # Test ############ Output is Written #########
                if [ "$ingNginx" -ne 0]; then
                    echo "ingress-nginx namespace failed to update"
                fi
                set +e
                echo -------//----------//------
                # Diagnostic info ############### Debug Proccess #
                kubectl get all
                kubectl get nodes

                kubectl describe all -n profile-site
                kubectl describe all -n ingress-nginx
                set -e
                echo ------//----------//-------------
                # Deployment ########### Double node K8s #######
                read -s -p "Please enter yes if you would like to continue with cleanup and deployment? This will remove all the data?" answer
                if [ "$answer" -eq "yes" ]; then
                    exit
                fi
                set +e
                kops delete cluster --name kubecluster.shahdevelopment.tech --state=s3://kubedevops001 --yes

                for ((i=10; i>=1; i--)); do
                    echo "$i"
                    sleep 1
                done

                kops create cluster --name=kubecluster.shahdevelopment.tech --state=s3://kubedevops001 --zones=us-west-1b,us-west-1c --node-count=2 --node-image=ami-0d8471611083c0327 --node-size=t2.small --control-plane-image=ami-0d8471611083c0327 --master-size=t2.medium --dns-zone=kubecluster.shahdevelopment.tech --node-volume-size=15 --master-volume-size=15 && sleep 2

                kops update cluster --name kubecluster.shahdevelopment.tech --state=s3://kubedevops001 --yes --admin && sleep 2

                kops validate cluster --name=kubecluster.shahdevelopment.tech --state=s3://kubedevops001 --wait 15m --count 20 && sleep 2

                # Test ############ Crossroads Point ########
                kubectl get pods -n profile-site && proSite=$?
                profile=$?
                kubectl get pods -n ingress-nginx && ingNginx=$?
                nginx=$?
                if [ "$profile" -eq 0 && "$nginx" -eq 0 ]; then
                    echo "Deployment Successfull!"
                    exit
                fi
                    echo "Deployment Failed!"
                    exit

                echo "*******Cluster Deployment ***********"
                set -e
            else
                echo ----------//------------//-----------
                set +e
                kops validate cluster --config=/home/ansible/.kube/config --name=kubecluster.shahdevelopment.tech --state=s3://kubedevops001 && sleep 3
                kubectl get pods -n profile-site && proSite=$?
                kubectl get pods -n ingress-nginx && ingNginx=$?

                if [ "$proSite" -eq 0 ] && [ "$ingNginx" -eq 0 ]; then
                    condition1_met=true
                # if [ "$ingNginx" -eq 0 ]; then
                    # condition2_met=true
                fi
                set -e
            fi
            elapsed_time=$((SECONDS-start_time))
            set -e
            echo 'Elapsed time: $elapsed_time seconds'
            echo ----------//---------------//-------------------
            echo ----------//---------------//-------------------
        done
    else
        echo Cluster is running!
    fi
else
    echo Cluster is runnning!
fi